const data = `<h1 id="浏览器渲染原理" tabindex="-1" class="line" data-line="0">浏览器渲染原理</h1>
<p class="line" data-line="1">重排和重绘是浏览器运行过程中一个很重要的特性，页面的动画，结构变化都会涉及到重排与重绘，重排与重绘也是影响前端页面性能的一个很重要的因素，如果页面存在大量的重排与重绘，页面会显得非常“卡”，影响用户体验。</p>
<p class="line" data-line="3">说道重排与重绘，首先要了解浏览器的渲染原理，浏览器渲染展示页面的过程，大致分为以下几步：</p>
<ul>
<li>解析<code>HTML</code>结构（<code>HTML Parser</code>），构建<code>DOM树</code>（<code>DOM Tree</code>）</li>
<li>解析<code>CSS</code>（<code>CSS Parser</code>），构建<code>CSS规则树</code>（<code>Style Rules</code>）</li>
<li>将<code>DOM树</code>与<code>CSS规则树</code>合并，构建<code>渲染树</code>（<code>Rendering Tree</code>）</li>
<li>布局（<code>Layout</code>）和绘制（<code>Paint</code>）</li>
<li>如果在渲染过程中发生了结构变化或者样式变化，则会进行重排（<code>reflow</code>）和重绘（<code>repaint</code>）</li>
</ul>
<blockquote>
<p>重排（<code>reflow</code>）也称为回流</p>
</blockquote>
<!-- more -->
<p class="line" data-line="12">Webkit内核渲染引擎工作原理（Chrome，Safari，Opera）<br>
<img src="http://qncdn-open.baihuzi.com/image/9c632c60-e359-47c1-a113-3ad3289eb222.png" alt="9c632c60-e359-47c1-a113-3ad3289eb222.png" title="9c632c60-e359-47c1-a113-3ad3289eb222.png"><br>
Geoko内核渲染引擎工作原理（Firefox）<br>
<img src="http://qncdn-open.baihuzi.com/image/0ae63aa5-962e-4c8d-8f8d-a48eee614705.png" alt="0ae63aa5-962e-4c8d-8f8d-a48eee614705.png" title="0ae63aa5-962e-4c8d-8f8d-a48eee614705.png"></p>
<h1 id="什么是重排reflow" tabindex="-1" class="line" data-line="17">什么是重排（reflow）？</h1>
<p class="line" data-line="18">当页面布局完成后，由于用户操作，增删了节点，修改了节点的宽高等，浏览器为了重新渲染部分或整个页面，重新计算页面元素位置和几何结构的进程叫做<code>reflow</code>.</p>
<p class="line" data-line="20">reflow(回流)是导致DOM脚本执行效率低的关键因素之一，页面上任何一个节点触发了reflow，会导致它的子节点及祖先节点重新渲染。</p>
<p class="line" data-line="22">简单解释一下 Reflow：当元素改变的时候，将会影响文档内容或结构，或元素位置，此过程称为 Reflow。</p>
<p class="line" data-line="24">当页面布局和几何属性改变时就需要重排。下述情况会发生浏览器重排：</p>
<ul>
<li>添加或者删除可见的DOM元素</li>
<li>元素位置改变</li>
<li>元素尺寸改变（包括：内外边距、边框厚度、宽度和高度等属性的改变）</li>
<li>内容改变，例如：文本改变或者图片被另一个不同尺寸的图片替代</li>
<li>页面渲染器初始化</li>
<li>浏览器窗口尺寸改变</li>
<li>对可见元素 display：none，或者对不可见元素 display：block 时</li>
<li>激活伪类(:hover)</li>
<li>transition对宽高的处理，在整个transition的每一帧中，浏览器都要去重新布局，绘制页面(参考)</li>
</ul>
<h1 id="什么是重绘repaint" tabindex="-1" class="line" data-line="35">什么是重绘（repaint）？</h1>
<p class="line" data-line="36"><code>repaint</code>是在一个元素的外观被改变，但没有改变布局的情况下发生的，如改变了<code>visibility</code>、<code>outline</code>、<code>background</code>等。当<code>repaint</code>发生时，浏览器会验证<code>DOM树</code>上所有其他节点的<code>visibility</code>属性。</p>
<p class="line" data-line="38">避免过分重绘(<code>Repaints</code>)<br>
当元素改变的时候，将不会影响元素在页面当中的位置（比如 <code>background-color</code>, <code>border-color</code>, <code>visibility</code>），浏览器仅仅会应用新的样式重绘此元素，此过程称为 <code>Repaint</code>。</p>
<p class="line" data-line="41">当 <code>render tree</code> 中的一些元素需要更新属性，而这些属性只是影响元素的外观、风格，而不会影响布局的，比如 <code>background-color</code>，则称之为重绘。</p>
<ul>
<li>改变字体</li>
<li>增加或者移除样式表</li>
<li>内容变化，比如用户在input框中输入文字</li>
<li>激活CSS伪类(:hover)</li>
<li>脚本操作DOM （也有可能造成回流）</li>
<li>计算 offsetWidth 和 offsetHeight 的属性</li>
<li>设置style属性的值</li>
</ul>
<h1 id="通过例子分析重排和重绘" tabindex="-1" class="line" data-line="51">通过例子分析重排和重绘</h1>
<p class="line" data-line="52">我们可以结合浏览器的性能分析工具，来看到浏览器的渲染过程，通过以下代码，我们来分别看看重排和重绘何时发生</p>
<pre class="hljs codeWrapper"><table><tbody><tr><td class="gutter"><pre><span class="code-line">1</span><br><span class="code-line">2</span><br><span class="code-line">3</span><br><span class="code-line">4</span><br><span class="code-line">5</span><br><span class="code-line">6</span><br><span class="code-line">7</span><br><span class="code-line">8</span><br><span class="code-line">9</span><br><span class="code-line">10</span><br><span class="code-line">11</span><br><span class="code-line">12</span><br><span class="code-line">13</span><br><span class="code-line">14</span><br><span class="code-line">15</span><br><span class="code-line">16</span><br><span class="code-line">17</span><br><span class="code-line">18</span><br><span class="code-line">19</span><br><span class="code-line">20</span><br><span class="code-line">21</span><br><span class="code-line">22</span><br><span class="code-line">23</span><br><span class="code-line">24</span><br><span class="code-line">25</span><br><span class="code-line">26</span><br><span class="code-line">27</span><br><span class="code-line">28</span><br><span class="code-line">29</span><br><span class="code-line">30</span><br><span class="code-line">31</span><br><span class="code-line">32</span><br><span class="code-line">33</span><br><span class="code-line">34</span><br><span class="code-line">35</span><br><span class="code-line">36</span><br><span class="code-line">37</span><br><span class="code-line">38</span><br><span class="code-line">39</span><br><span class="code-line">40</span><br><span class="code-line">41</span><br></pre></td><td><code class=language-html><span class="hljs-meta">&lt;!DOCTYPE <span class="hljs-keyword">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;zh&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;viewport&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;width=device-width, initial-scale=1.0&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">&quot;X-UA-Compatible&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;ie=edge&quot;</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/css&quot;</span>&gt;</span><span class="language-css">
        <span class="hljs-selector-class">.main</span>{
            <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid red;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;addNode&quot;</span>&gt;</span>添加节点<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;changeStyle&quot;</span>&gt;</span>修改颜色<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;main&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;ul&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>11111<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>22222<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>33333<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>44444<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://cdn.bootcss.com/zepto/1.2.0/zepto.min.js&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/javascript&quot;</span>&gt;</span><span class="language-javascript">
    <span class="hljs-keyword">const</span> ul = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&#x27;.ul&#x27;</span>);
    <span class="hljs-keyword">const</span> addNodeBtn = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&#x27;#addNode&#x27;</span>);
    <span class="hljs-keyword">const</span> changeStyleBtn = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelector</span>(<span class="hljs-string">&#x27;#changeStyle&#x27;</span>);
    addNodeBtn.<span class="hljs-property">onclick</span> = <span class="hljs-keyword">function</span> <span class="hljs-title function_">addNode</span>(<span class="hljs-params"></span>) {
      <span class="hljs-keyword">const</span> newLi = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;li&#x27;</span>);
      newLi.<span class="hljs-property">innerText</span> = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>() * <span class="hljs-number">10000</span>;
      ul.<span class="hljs-title function_">appendChild</span>(newLi);
    }
    changeStyleBtn.<span class="hljs-property">onclick</span> = <span class="hljs-keyword">function</span> <span class="hljs-title function_">changeStyle</span>(<span class="hljs-params"></span>) {
      $(<span class="hljs-string">&#x27;.main&#x27;</span>).<span class="hljs-title function_">css</span>(<span class="hljs-string">&#x27;color&#x27;</span>, <span class="hljs-string">&#x27;red&#x27;</span>)
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></td></tr></tbody></table></pre>
<p class="line" data-line="96">当我们向<code>ul</code>中添加一个<code>li</code>，此时<code>dom</code>结构发生了变化，会发生重排<br>
<img src="/images/%E9%87%8D%E6%8E%92.gif" alt=""></p>
<p class="line" data-line="99">当我们仅仅只是修改了文字的颜色，此时并不会发生重排，仅仅会发生重绘<br>
<img src="/images/%E9%87%8D%E7%BB%98.gif" alt=""></p>
<p class="line" data-line="102">同时我们可以看到，只要发生了重排，则必然会出现重绘，而重绘并不一定会重排，我们可以得出一个结论：<strong>重排必定会引发重绘，但重绘不一定会引发重排。</strong></p>
<h1 id="渲染树变化的排队与刷新" tabindex="-1" class="line" data-line="104">渲染树变化的排队与刷新</h1>
<p class="line" data-line="105">浏览器会维护一个队列，把所有会引起回流、重绘的操作放入这个队列，等队列中的操作到了一定的数量或者到了一定的时间间隔，浏览器就会<code>flush</code>队列，进行一个批处理。这样就会让多次的回流、重绘变成一次回流重绘。然而你可能会（经常不知不觉）强制刷新队列并要求计划任务立即执行。获取布局信息的操作会导致队列刷新，比如以下方法：</p>
<ul>
<li><code>offsetTop</code>，<code>offsetLeft</code>，<code>offsetWidth</code>，<code>offsetHeight</code></li>
<li><code>scrollTop</code>，<code>scrollLeft</code>，<code>scrollWidth</code>，<code>scrollHeight</code></li>
<li><code>clientTop</code>，<code>clientLeft</code>，<code>clientWidth</code>，<code>clientHeight</code></li>
<li><code>width</code>，<code>height</code></li>
<li><code>getComputedStyle()</code> (<code>currentStyle</code> in IE)</li>
<li>JS更改元素style</li>
</ul>
<p class="line" data-line="113">以上属性和方法需要返回最新的布局信息，因此浏览器不得不执行渲染队列中的“待处理”变化并触发重排以返回正确的值。</p>
<p class="line" data-line="115">在修改样式的过程中，最好避免使用上面列出的属性。它们都会刷新渲染队列，即使你是在获取最近未发生改变的或者与最新变化无关的布局信息。</p>
<h1 id="优化" tabindex="-1" class="line" data-line="118">优化</h1>
<p class="line" data-line="119">上述提到的浏览器自己的优化，维护一个队列，队重排和重绘进行批处理</p>
<p class="line" data-line="121">开发者需要注意的优化</p>
<ul>
<li>直接改变元素的<code>className</code></li>
<li><code>display：none;</code> 先设置元素为<code>display：none;</code>，然后进行页面布局等操作；设置完成后将元素设置为<code>display：block;</code>，这样的话就只引发两次重绘和重排；</li>
<li>不要经常访问浏览器的flush队列属性；如果一定要访问，可以利用缓存。将访问的值存储起来，接下来使用就不会再引发回流；</li>
<li>使用<code>cloneNode</code>(true or false) 和 <code>replaceChild</code> 技术，引发一次回流和重绘；</li>
<li>将需要多次重排的元素，<code>position</code>属性设为<code>absolute</code>或<code>fixed</code>，元素脱离了文档流，它的变化不会影响到其他元素；</li>
<li>如果需要创建多个<code>DOM</code>节点，可以使用<code>DocumentFragment</code>创建完后一次性的加入<code>document</code>；</li>
<li>尽量不要使用<code>table</code>布局。</li>
<li>制作动画时，尽量使用 <code>CSS3</code> 的 <code>transform</code>，因为 <code>transform</code> 属性不会改变元素的布局（更详细的知识可以参考：<a href="https://juejin.cn/post/6844903502678867981" target="_blank">详谈层合成composite</a> ）</li>
</ul>
`;

const toc = `<ul class="root"><li><a href="#浏览器渲染原理">浏览器渲染原理</a></li><li><a href="#什么是重排reflow">什么是重排（reflow）？</a></li><li><a href="#什么是重绘repaint">什么是重绘（repaint）？</a></li><li><a href="#通过例子分析重排和重绘">通过例子分析重排和重绘</a></li><li><a href="#渲染树变化的排队与刷新">渲染树变化的排队与刷新</a></li><li><a href="#优化">优化</a></li></ul>`;

export function fetchArticle() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data, toc });
    }, 2000);
  });
}
