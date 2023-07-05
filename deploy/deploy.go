package main

import (
	"context"
	"fmt"
	"io"
	"io/fs"
	"log"
	"net"
	"os"
	"path"
	"path/filepath"
	"runtime"
	"strconv"
	"sync"

	"github.com/mitchellh/go-homedir"
	"github.com/pkg/sftp"
	"github.com/qiniu/go-sdk/v7/auth/qbox"
	"github.com/qiniu/go-sdk/v7/storage"
	"github.com/spf13/viper"
	"golang.org/x/crypto/ssh"
)

// 上传图片到七牛云，然后返回状态和图片的url
func UploadToQiNiu(file string) (int, string) {

	var AccessKey = viper.GetString("qiniu.AccessKey") // 秘钥对
	var SerectKey = viper.GetString("qiniu.SerectKey")
	var Bucket = viper.GetString("qiniu.Bucket")       // 空间名称
	var publicUrl = viper.GetString("qiniu.publicUrl") // 自定义域名或测试域名

	putPlicy := storage.PutPolicy{
		Scope: Bucket,
	}
	mac := qbox.NewMac(AccessKey, SerectKey)

	// 获取上传凭证
	upToken := putPlicy.UploadToken(mac)

	// 配置参数
	cfg := storage.Config{
		Zone:          &storage.ZoneHuanan, // 华南区
		UseCdnDomains: false,
		UseHTTPS:      false, // 非https
	}
	formUploader := storage.NewFormUploader(&cfg)

	ret := storage.PutRet{}        // 上传后返回的结果
	putExtra := storage.PutExtra{} // 额外参数
	// 上传 自定义key，可以指定上传目录及文件名和后缀，

	ext := filepath.Ext(file)
	var uploadPath string

	switch ext {
	case ".js":
		uploadPath = "static/js/"
	case ".css":
		uploadPath = "static/css/"
	case ".ttf", ".png", ".jpg", "jped", ".gif":
		uploadPath = "static/media/"
	case ".svg":
		uploadPath = ""
	}

	key := uploadPath + filepath.Base(file) // 上传路径，如果当前目录中已存在相同文件，则返回上传失败错误
	err := formUploader.PutFile(context.Background(), &ret, upToken, key, file, &putExtra)

	if err != nil {
		code := 501
		return code, err.Error()
	}

	url := publicUrl + ret.Key // 返回上传后的文件访问路径
	return 0, url
}

var keypath = "~/.ssh/id_rsa"

// 获取秘钥
func publicKey(path string) ssh.AuthMethod {
	keypath, err := homedir.Expand(path)
	if err != nil {
		fmt.Println("获取秘钥路径失败", err)
	}
	key, err1 := os.ReadFile(keypath)
	if err1 != nil {
		fmt.Println("读取秘钥失败", err1)
	}
	signer, err2 := ssh.ParsePrivateKey(key)
	if err2 != nil {
		fmt.Println("ssh 秘钥签名失败", err2)
	}
	return ssh.PublicKeys(signer)
}

// 获取ssh连接
func GetSSHConect(ip, user string, port int) *ssh.Client {
	con := &ssh.ClientConfig{
		User: user,
		Auth: []ssh.AuthMethod{publicKey(keypath)},
		HostKeyCallback: func(hostname string, remote net.Addr, key ssh.PublicKey) error {
			return nil
		},
	}
	log.Printf("建立ssh连接，ip: %s, port: %d.", ip, port)
	addr := fmt.Sprintf("%s:%d", ip, port)
	client, err := ssh.Dial("tcp", addr, con)
	if err != nil {
		log.Printf("\033[0m\033[1;31m%s\033[0m%s\n", "建立ssh连接失败！", err)
		panic(err)
	}
	return client
}

// 获取ftp连接
func getftpclient(client *ssh.Client) *sftp.Client {
	ftpclient, err := sftp.NewClient(client)
	if err != nil {
		fmt.Println("创建ftp客户端失败！", err)
		panic(err)
	}
	return ftpclient
}

// 上传文件
func UploadFile(ip, user, localpath, remotepath string, port int) {
	client := GetSSHConect(ip, user, port)
	ftpclient := getftpclient(client)
	defer ftpclient.Close()
	remoteFileName := path.Base(localpath)
	srcFile, err := os.Open(localpath)
	if err != nil {
		log.Println("打开文件失败", err)
		panic(err)
	}
	log.Printf("开始上传 %s 到服务器", remoteFileName)
	defer srcFile.Close()
	dstFile, e := ftpclient.Create(path.Join(remotepath, remoteFileName))
	if e != nil {
		log.Println("创建文件失败", e)
		panic(e)
	}
	defer dstFile.Close()

	buffer := make([]byte, 1024*500)
	fileSata, _ := srcFile.Stat()
	fileSize := fileSata.Size()
	var sum int64 = 0
	for {
		n, err := srcFile.Read(buffer)
		fmt.Printf("\r上传进度: %d%%", int64(sum*100/fileSize))
		sum += int64(n)
		if err != nil {
			if err == io.EOF {
				log.Printf("\033[0m\033[1;32m%s\033[0m\n", "已读取到文件末尾！")
				break
			} else {
				log.Printf("\033[0m\033[1;31m%s\033[0m%s\n", "读取文件出错！", err)
				panic(err)
			}
		}
		dstFile.Write(buffer[:n]) //注意，由于文件大小不定，不可直接使用buffer，否则会在文件末尾重复写入，以填充1024的整数倍
	}
	log.Printf("\033[0m\033[1;32m%s\033[0m\n", "文件上传成功")

	webPath := viper.GetString("linux.webPath")
	log.Printf("解压文件 %s 到远程web目录 %s", remoteFileName, webPath)
	if result, err := RunCmd(client, fmt.Sprintf("tar -xvzf /root/%s -C %s", remoteFileName, webPath)); err != nil {
		log.Printf("\033[0m\033[1;31m%s\033[0m\n", "解压失败！")
	} else {
		log.Println(result)
		log.Printf("\033[0m\033[1;32m%s\033[0m\n", "解压成功！")
	}

	log.Println("重启nginx服务器")
	if _, err := RunCmd(client, "systemctl restart nginx"); err != nil {
		log.Printf("\033[0m\033[1;31m%s\033[0m\n", "重启nginx服务器失败！")
	} else {
		log.Printf("\033[0m\033[1;32m%s\033[0m\n", "重启nginx服务器成功！")
	}
}

func RunCmd(cli *ssh.Client, shell string) (string, error) {
	session, err := cli.NewSession()
	if err != nil {
		return "error", err
	}
	defer session.Close()
	buf, err := session.CombinedOutput(shell)
	return string(buf), err
}

func init() {
	viper.SetConfigName("deploy.config")
	viper.SetConfigType("json")
	viper.AddConfigPath(".")

	err := viper.ReadInConfig()
	if err != nil {
		log.Fatalf("fatal error config file: %s", err)
	}

}

func main() {
	sysType := runtime.GOOS

	logFile, _ := os.OpenFile("deploy.log", os.O_CREATE|os.O_RDWR|os.O_TRUNC, 0666)
	multiWriter := io.MultiWriter(os.Stdout, logFile)
	log.SetOutput(multiWriter)
	defer logFile.Close()

	var sourceCodePath string
	if sysType == "windows" {
		sourceCodePath = viper.GetString("windows.sourceCodePath")
	} else {
		sourceCodePath = viper.GetString("linux.sourceCodePath")

	}

	buildPath := path.Join(sourceCodePath, "build")

	if err := os.Chdir(buildPath); err != nil {
		log.Printf("Change dir to %s failed", buildPath)
	}

	ip := viper.GetString("linux.ip")
	port, _ := strconv.Atoi(viper.GetString("linux.port"))
	UploadFile(ip, "root", path.Join(sourceCodePath, "build.tar.gz"), "/root", port)

	var wg sync.WaitGroup
	wg.Add(1)
	go func() {
		defer wg.Done()
		log.Println("部署资源到七牛云CDN")
		filepath.WalkDir(path.Join(buildPath, "static"), func(path string, d fs.DirEntry, _ error) error {
			isDir := d.Type().IsDir()
			if !isDir {
				code, url := UploadToQiNiu(path)
				if code == 0 {
					log.Printf("\033[0m\033[1;32m%s\033[0m, CDN地址: %s", "上传成功", url)
				}
			}
			return nil
		})
		code, url := UploadToQiNiu(path.Join(buildPath, "favicon.svg"))
		if code == 0 {
			log.Printf("\033[0m\033[1;32m%s\033[0m, CDN地址: %s", "上传成功", url)
		}
	}()
	wg.Wait()
}
