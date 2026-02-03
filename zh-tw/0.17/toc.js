// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="index.html">介紹</a></li><li class="chapter-item expanded affix "><li class="spacer"></li><li class="chapter-item expanded "><a href="getting_started.html"><strong aria-hidden="true">1.</strong> 開始使用</a></li><li class="chapter-item expanded "><a href="module.html"><strong aria-hidden="true">2.</strong> Python 模組</a></li><li class="chapter-item expanded "><a href="function.html"><strong aria-hidden="true">3.</strong> Python 函式</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="function/signature.html"><strong aria-hidden="true">3.1.</strong> 函式簽名</a></li><li class="chapter-item expanded "><a href="function/error_handling.html"><strong aria-hidden="true">3.2.</strong> 錯誤處理</a></li></ol></li><li class="chapter-item expanded "><a href="class.html"><strong aria-hidden="true">4.</strong> Python 類別</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="class/protocols.html"><strong aria-hidden="true">4.1.</strong> 類別自訂</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="class/object.html"><strong aria-hidden="true">4.1.1.</strong> 基本物件自訂</a></li><li class="chapter-item expanded "><a href="class/numeric.html"><strong aria-hidden="true">4.1.2.</strong> 仿真數值型別</a></li><li class="chapter-item expanded "><a href="class/call.html"><strong aria-hidden="true">4.1.3.</strong> 仿真可呼叫物件</a></li></ol></li></ol></li><li class="chapter-item expanded "><a href="conversions.html"><strong aria-hidden="true">5.</strong> 型別轉換</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="conversions/tables.html"><strong aria-hidden="true">5.1.</strong> Rust 型別對應到 Python 型別</a></li><li class="chapter-item expanded "><a href="conversions/traits.html"><strong aria-hidden="true">5.2.</strong> 轉換特徵</a></li></ol></li><li class="chapter-item expanded "><a href="exception.html"><strong aria-hidden="true">6.</strong> Python 例外狀況</a></li><li class="chapter-item expanded "><a href="python_from_rust.html"><strong aria-hidden="true">7.</strong> 從 Rust 呼叫 Python</a></li><li class="chapter-item expanded "><a href="types.html"><strong aria-hidden="true">8.</strong> GIL, mutability and object types</a></li><li class="chapter-item expanded "><a href="parallelism.html"><strong aria-hidden="true">9.</strong> 平行化</a></li><li class="chapter-item expanded "><a href="debugging.html"><strong aria-hidden="true">10.</strong> 除錯</a></li><li class="chapter-item expanded "><a href="features.html"><strong aria-hidden="true">11.</strong> 功能參考</a></li><li class="chapter-item expanded "><a href="memory.html"><strong aria-hidden="true">12.</strong> Memory management</a></li><li class="chapter-item expanded "><a href="advanced.html"><strong aria-hidden="true">13.</strong> 進階話題</a></li><li class="chapter-item expanded "><a href="building_and_distribution.html"><strong aria-hidden="true">14.</strong> 建置與散布</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="building_and_distribution/multiple_python_versions.html"><strong aria-hidden="true">14.1.</strong> 支援多種 Python 版本</a></li></ol></li><li class="chapter-item expanded "><a href="ecosystem.html"><strong aria-hidden="true">15.</strong> 實用 crate</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ecosystem/logging.html"><strong aria-hidden="true">15.1.</strong> 日誌</a></li><li class="chapter-item expanded "><a href="ecosystem/async-await.html"><strong aria-hidden="true">15.2.</strong> 使用 async 和 await</a></li></ol></li><li class="chapter-item expanded "><a href="faq.html"><strong aria-hidden="true">16.</strong> 常見問題與疑難排解</a></li><li class="chapter-item expanded affix "><li class="spacer"></li><li class="chapter-item expanded affix "><a href="migration.html">Appendix A: Migration guide</a></li><li class="chapter-item expanded affix "><a href="rust_cpython.html">Appendix B: PyO3 and rust-cpython</a></li><li class="chapter-item expanded affix "><a href="trait_bounds.html">Appendix C: Trait bounds</a></li><li class="chapter-item expanded affix "><a href="python_typing_hints.html">Appendix D: Python typing hints</a></li><li class="chapter-item expanded affix "><a href="changelog.html">CHANGELOG</a></li><li class="chapter-item expanded affix "><li class="spacer"></li><li class="chapter-item expanded affix "><a href="contributing.html">參與貢獻</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
