// script.js 文件内容 - 增强版
document.addEventListener("DOMContentLoaded", function () {
  // 获取DOM元素
  const filterBtn = document.getElementById("filter-btn");
  const filterDrawer = document.getElementById("filter-drawer");
  const cityBtns = document.querySelectorAll(".city-btn");
  const districtBtns = document.querySelectorAll(".district-btn");
  const searchBtn = document.querySelector(".search-btn");
  const searchBox = document.getElementById("search-box");
  const hotSearchDropdown = document.getElementById("hot-search-dropdown");
  const hotSearchList = document.getElementById("hot-search-list");
  const contactBtn = document.getElementById("contact-btn");
  const contactDrawer = document.getElementById("contact-drawer");
  const closeContactBtn = document.getElementById("close-contact-btn");
  const feedbackBtn = document.getElementById("feedback-btn");
  const overlay = document.getElementById("overlay");
  const copyButtons = document.querySelectorAll(".copy-btn");

  // 热搜榜数据 - 热度排行前五的景点
  const hotAttractions = [
    { name: "广州塔", rank: 1, searchCount: 9520 },
    { name: "长隆旅游度假区", rank: 2, searchCount: 8765 },
    { name: "白云山风景名胜区", rank: 3, searchCount: 7543 },
    { name: "北京路文化旅游区", rank: 4, searchCount: 6892 },
    { name: "沙面岛", rank: 5, searchCount: 6210 },
  ];

  // 初始化热搜榜
  function initHotSearchList() {
    hotSearchList.innerHTML = "";

    hotAttractions.forEach((attraction) => {
      const listItem = document.createElement("li");
      listItem.className = "hot-search-item";
      listItem.innerHTML = `
                <span class="hot-rank hot-rank-${attraction.rank}">${attraction.rank}</span>
                <span class="hot-search-name">${attraction.name}</span>
                <span class="hot-search-count">🔥${attraction.searchCount}</span>
            `;

      // 点击热搜项跳转到对应景点详情页
      listItem.addEventListener("click", function () {
        // 获取景点名称，特殊处理括号内容
        let attractionName = attraction.name;
        // 如果是"长隆旅游度假区"，我们data.js中使用的是"长隆旅游度假区"
        if (attractionName === "长隆旅游度假区") {
          attractionName = "长隆旅游度假区";
        }
        // 跳转到详情页
        window.location.href = `attraction.html?name=${encodeURIComponent(attractionName)}`;
      });

      hotSearchList.appendChild(listItem);
    });
  }

  // 初始化热搜榜
  initHotSearchList();

  // 切换筛选抽屉显示
  filterBtn.addEventListener("click", function (e) {
    e.stopPropagation(); // 阻止事件冒泡
    filterDrawer.classList.toggle("hidden");
    // 关闭其他打开的抽屉
    if (!hotSearchDropdown.classList.contains("hidden")) {
      hotSearchDropdown.classList.add("hidden");
    }
    if (!contactDrawer.classList.contains("hidden")) {
      contactDrawer.classList.add("hidden");
      overlay.classList.add("hidden");
    }
  });

  // 点击城市按钮时，切换对应区的列表显示
  cityBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // 关闭其他所有城市的区县列表
      document.querySelectorAll(".district-list").forEach((list) => {
        if (list !== this.nextElementSibling) {
          list.classList.add("hidden");
        }
      });

      // 切换当前城市的区县列表
      const districtList = this.nextElementSibling;
      if (districtList) {
        districtList.classList.toggle("hidden");
      }
    });
  });

  // 点击区按钮时，切换对应景点列表显示
  districtBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // 关闭其他所有区的景点列表
      this.parentElement
        .querySelectorAll(".attraction-list")
        .forEach((list) => {
          if (list !== this.nextElementSibling) {
            list.classList.add("hidden");
          }
        });

      // 切换当前区的景点列表
      const attractionList = this.nextElementSibling;
      if (attractionList) {
        attractionList.classList.toggle("hidden");
      }
    });
  });

  // 搜索功能
  function performSearch() {
    const query = searchBox.value.trim().toLowerCase();
    if (query) {
      // 隐藏所有列表
      document
        .querySelectorAll(".district-list, .attraction-list")
        .forEach((list) => {
          list.classList.add("hidden");
        });

      // 显示所有城市
      cityBtns.forEach((btn) => {
        btn.parentElement.style.display = "block";
      });

      // 搜索景点
      const attractionLinks = document.querySelectorAll(".attraction-link");
      let found = false;

      attractionLinks.forEach((link) => {
        const attractionName = link.textContent.toLowerCase();
        if (attractionName.includes(query)) {
          // 显示该景点所在的区县和城市
          const districtList =
            link.closest(".attraction-list").previousElementSibling;
          const cityBtn = link
            .closest(".city-list > li")
            .querySelector(".city-btn");

          // 显示对应的区县列表和城市
          if (districtList) {
            districtList.classList.remove("hidden");
            // 模拟点击城市按钮以展开
            if (cityBtn && cityBtn.getAttribute("data-city") === "广州") {
              const cityDistrictList = cityBtn.nextElementSibling;
              if (cityDistrictList) {
                cityDistrictList.classList.remove("hidden");
              }
            }
          }

          // 显示该景点列表
          link.closest(".attraction-list").classList.remove("hidden");

          // 高亮匹配的景点
          link.style.backgroundColor = "#ffeb3b";
          link.style.fontWeight = "bold";

          found = true;
        } else {
          link.style.backgroundColor = "";
          link.style.fontWeight = "";
        }
      });

      // 搜索区县
      districtBtns.forEach((btn) => {
        const districtName = btn.textContent.toLowerCase();
        if (districtName.includes(query)) {
          // 显示该区县所在的城市
          const cityBtn = btn
            .closest(".city-list > li")
            .querySelector(".city-btn");

          // 显示对应的区县列表
          btn.parentElement
            .querySelector(".attraction-list")
            .classList.remove("hidden");
          // 模拟点击城市按钮以展开
          if (cityBtn && cityBtn.getAttribute("data-city") === "广州") {
            const cityDistrictList = cityBtn.nextElementSibling;
            if (cityDistrictList) {
              cityDistrictList.classList.remove("hidden");
            }
          }

          // 高亮匹配的区县
          btn.style.backgroundColor = "#ffeb3b";
          btn.style.fontWeight = "bold";

          found = true;
        } else {
          btn.style.backgroundColor = "";
          btn.style.fontWeight = "";
        }
      });

      // 搜索城市
      cityBtns.forEach((btn) => {
        const cityName = btn.textContent.toLowerCase();
        if (cityName.includes(query)) {
          // 显示该城市
          const districtList = btn.nextElementSibling;
          if (districtList) {
            districtList.classList.remove("hidden");
          }

          // 高亮匹配的城市
          btn.style.backgroundColor = "#ffeb3b";
          btn.style.fontWeight = "bold";

          found = true;
        } else {
          btn.style.backgroundColor = "";
          btn.style.fontWeight = "";
        }
      });

      if (!found) {
        alert("未找到匹配的景点、区县或城市");
      }
    } else {
      // 清空搜索时重置所有样式
      resetSearchHighlights();
    }
  }

  function resetSearchHighlights() {
    document
      .querySelectorAll(".attraction-link, .district-btn, .city-btn")
      .forEach((element) => {
        element.style.backgroundColor = "";
        element.style.fontWeight = "";
      });
  }

  // 搜索按钮点击事件
  searchBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    performSearch();
    // 搜索后关闭热搜下拉
    hotSearchDropdown.classList.add("hidden");
  });

  // 搜索框键盘事件
  searchBox.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      performSearch();
      // 搜索后关闭热搜下拉
      hotSearchDropdown.classList.add("hidden");
    }
  });

  // 搜索框获取焦点时显示热搜下拉
  searchBox.addEventListener("focus", function (e) {
    e.stopPropagation();
    hotSearchDropdown.style.display = "block";
    // 关闭其他抽屉
    if (!filterDrawer.classList.contains("hidden")) {
      filterDrawer.classList.add("hidden");
    }
    if (!contactDrawer.classList.contains("hidden")) {
      contactDrawer.classList.add("hidden");
      overlay.classList.add("hidden");
    }
  });

  // 搜索框失去焦点时隐藏热搜下拉（有延迟，避免点击热搜项时立即关闭）
  searchBox.addEventListener("blur", function () {
    setTimeout(() => {
      // 检查是否有子元素获得焦点
      if (!hotSearchDropdown.contains(document.activeElement)) {
        hotSearchDropdown.style.display = "none";
      }
    }, 200);
  });

  // 热搜下拉获得焦点时保持显示
  hotSearchDropdown.addEventListener("mouseenter", function () {
    clearTimeout(hotSearchDropdown.hideTimeout);
  });

  hotSearchDropdown.addEventListener("mouseleave", function () {
    hotSearchDropdown.hideTimeout = setTimeout(() => {
      if (!searchBox.contains(document.activeElement)) {
        hotSearchDropdown.style.display = "none";
      }
    }, 300);
  });

  // 点击页面其他地方关闭热搜下拉
  document.addEventListener("click", function (e) {
    if (
      !searchBox.contains(e.target) &&
      !hotSearchDropdown.contains(e.target)
    ) {
      hotSearchDropdown.style.display = "none";
    }
  });

  // 联系我按钮点击事件
  contactBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    // 切换联系抽屉显示
    contactDrawer.classList.toggle("hidden");
    // 显示或隐藏遮罩层
    if (!contactDrawer.classList.contains("hidden")) {
      overlay.classList.remove("hidden");
    } else {
      overlay.classList.add("hidden");
    }
    // 关闭其他打开的抽屉
    if (!filterDrawer.classList.contains("hidden")) {
      filterDrawer.classList.add("hidden");
    }
    if (hotSearchDropdown.style.display === "block") {
      hotSearchDropdown.style.display = "none";
    }
  });

  // 关闭联系抽屉按钮
  closeContactBtn.addEventListener("click", function () {
    contactDrawer.classList.add("hidden");
    overlay.classList.add("hidden");
  });

  // 问题反馈按钮点击事件
  feedbackBtn.addEventListener("click", function () {
    // 跳转到第三方表单平台
    window.open("https://tally.so/r/LZdEBl", "_blank");
  });

  // 遮罩层点击事件
  overlay.addEventListener("click", function () {
    contactDrawer.classList.add("hidden");
    overlay.classList.add("hidden");
  });

  // 复制按钮功能
  copyButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const textToCopy = this.getAttribute("data-text");

      // 使用现代Clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard
          .writeText(textToCopy)
          .then(() => {
            showCopySuccess(this);
          })
          .catch((err) => {
            console.error("复制失败:", err);
            fallbackCopyText(textToCopy, this);
          });
      } else {
        // 降级方案
        fallbackCopyText(textToCopy, this);
      }
    });
  });

  // 显示复制成功提示
  function showCopySuccess(button) {
    const originalText = button.textContent;
    button.textContent = "已复制!";
    button.style.backgroundColor = "#28a745";

    setTimeout(() => {
      button.textContent = originalText;
      button.style.backgroundColor = "";
    }, 1500);
  }

  // 降级复制方案
  function fallbackCopyText(text, button) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand("copy");
      if (successful) {
        showCopySuccess(button);
      } else {
        alert("复制失败，请手动复制：" + text);
      }
    } catch (err) {
      console.error("复制失败:", err);
      alert("复制失败，请手动复制：" + text);
    }

    document.body.removeChild(textArea);
  }

  // 页面加载时显示提示
  setTimeout(() => {
    const tipsElement = document.querySelector(".search-tips");
    if (tipsElement) {
      tipsElement.style.opacity = "1";
    }
  }, 500);
});
