// enhanced.js - 增强功能
document.addEventListener("DOMContentLoaded", function () {
  // 模拟AI推荐数据
  const aiRecommendations = {
    recent: ["广州塔", "白云山风景名胜区", "北京路文化旅游区"],
    family: ["长隆旅游度假区", "广州融创文旅城", "越秀公园（含五羊石像）"],
    couple: ["沙面岛", "太古仓", "白云山风景名胜区"],
    solo: ["广东省博物馆", "华南植物园", "陈家祠"],
    adventure: ["白水寨风景名胜区", "石门国家森林公园", "流溪河国家森林公园"],
  };

  // 模拟大数据
  const tourismData = {
    heatMap: {
      labels: [
        "广州塔",
        "长隆",
        "白云山",
        "北京路",
        "沙面岛",
        "陈家祠",
        "融创城",
        "百万葵园",
      ],
      data: [85, 78, 72, 68, 65, 60, 58, 55],
    },
    visitorOrigins: {
      广东省内: 45,
      北京: 12,
      上海: 10,
      深圳: 8,
      香港: 7,
      澳门: 5,
      其他: 13,
    },
    realTimeStats: {
      totalVisitors: 87245,
      heatIndex: 85.6,
      avgRating: 4.7,
    },
  };

  // 智能推荐功能
  function initAIRecommendation() {
    const personalityBtns = document.querySelectorAll(".personality-btn");
    const similarList = document.getElementById("similar-list");

    // 显示相似推荐
    if (similarList) {
      similarList.innerHTML = aiRecommendations.recent
        .map(
          (attraction) =>
            `<div class="recommend-item" onclick="window.location.href='attraction.html?name=${encodeURIComponent(attraction)}'">
                    <span>📍</span> ${attraction}
                </div>`,
        )
        .join("");
    }

    // 个性化匹配点击事件
    personalityBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const type = this.getAttribute("data-type");
        const recommendations = aiRecommendations[type];

        // 显示推荐结果
        const resultDiv = document.createElement("div");
        resultDiv.className = "recommend-result";
        resultDiv.innerHTML = `
                    <h4>为您推荐：</h4>
                    ${recommendations
                      .map(
                        (item) =>
                          `<div class="recommend-item" onclick="window.location.href='attraction.html?name=${encodeURIComponent(item)}'">
                            <span>👍</span> ${item}
                        </div>`,
                      )
                      .join("")}
                `;

        // 移除之前的推荐结果
        const oldResult = document.querySelector(".recommend-result");
        if (oldResult) {
          oldResult.remove();
        }

        // 添加到页面
        this.parentElement.appendChild(resultDiv);

        // 添加动画效果
        resultDiv.style.opacity = "0";
        resultDiv.style.transform = "translateY(20px)";

        setTimeout(() => {
          resultDiv.style.transition = "all 0.5s ease";
          resultDiv.style.opacity = "1";
          resultDiv.style.transform = "translateY(0)";
        }, 10);
      });
    });
  }

  // 初始化数据分析面板
  function initDataAnalysis() {
    // 更新实时数据
    document.getElementById("total-visitors").textContent = formatNumber(
      tourismData.realTimeStats.totalVisitors,
    );
    document.getElementById("hot-index").textContent =
      tourismData.realTimeStats.heatIndex.toFixed(1);
    document.getElementById("avg-rating").textContent =
      tourismData.realTimeStats.avgRating.toFixed(1);

    // 初始化图表
    initHeatChart();
    initMapChart();
  }

  // 初始化热度图表
  function initHeatChart() {
    const ctx = document.getElementById("heat-chart");
    if (!ctx) return;

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: tourismData.heatMap.labels,
        datasets: [
          {
            label: "热度指数",
            data: tourismData.heatMap.data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.7)",
              "rgba(54, 162, 235, 0.7)",
              "rgba(255, 206, 86, 0.7)",
              "rgba(75, 192, 192, 0.7)",
              "rgba(153, 102, 255, 0.7)",
              "rgba(255, 159, 64, 0.7)",
              "rgba(255, 99, 132, 0.7)",
              "rgba(54, 162, 235, 0.7)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `热度: ${context.parsed.y}%`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: "热度指数 (%)",
            },
          },
          x: {
            ticks: {
              maxRotation: 45,
            },
          },
        },
      },
    });
  }

  // 初始化地图图表
  function initMapChart() {
    const mapChart = document.getElementById("map-chart");
    if (!mapChart) return;

    const data = tourismData.visitorOrigins;
    let html = '<div class="map-data">';

    for (const [region, percentage] of Object.entries(data)) {
      const barWidth = percentage * 3; // 缩放因子
      html += `
                <div class="map-item">
                    <span class="region">${region}</span>
                    <div class="bar-container">
                        <div class="bar" style="width: ${barWidth}px; background: ${getColor(percentage)};">
                            <span class="percentage">${percentage}%</span>
                        </div>
                    </div>
                </div>
            `;
    }

    html += "</div>";
    mapChart.innerHTML = html;
  }

  // VR体验功能
  function initVRExperience() {
    const vrBtns = document.querySelectorAll(".vr-btn");

    vrBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const vrType = this.getAttribute("data-vr");
        simulateVRExperience(vrType);
      });
    });
  }

  // 模拟VR体验
  function simulateVRExperience(type) {
    const modal = document.createElement("div");
    modal.className = "vr-modal";

    let content = "";
    if (type === "cantontower") {
      content = `
                <h3>🌁 广州塔云端漫步</h3>
                <p>正在加载360°全景图像...</p>
                <div class="vr-simulator">
                    <div class="loading-vr">虚拟场景生成中 ▰▰▰▱▱ 60%</div>
                </div>
                <p>💡 提示：使用鼠标拖动可以环视全景</p>
            `;
    } else if (type === "shamian") {
      content = `
                <h3>⏳ 穿越时空的沙面岛</h3>
                <p>正在还原1920年代的沙面风貌...</p>
                <div class="vr-simulator">
                    <div class="loading-vr">历史场景重构中 ▰▰▰▰▱ 80%</div>
                </div>
                <p>📖 历史小知识：沙面曾为英法租界，保存了150多座欧洲风格建筑</p>
            `;
    }

    modal.innerHTML = `
            <div class="vr-modal-content">
                <button class="close-vr">×</button>
                ${content}
                <div class="vr-controls">
                    <button class="vr-control-btn" onclick="this.textContent='🎥 录制中...'">开始录制</button>
                    <button class="vr-control-btn" onclick="takeScreenshot()">拍照截图</button>
                    <button class="vr-control-btn" onclick="shareVR()">分享体验</button>
                </div>
            </div>
        `;

    document.body.appendChild(modal);

    // 关闭按钮
    modal.querySelector(".close-vr").addEventListener("click", function () {
      document.body.removeChild(modal);
    });

    // 模拟加载完成
    setTimeout(() => {
      const loadingDiv = modal.querySelector(".loading-vr");
      if (loadingDiv) {
        loadingDiv.textContent = "✅ 场景加载完成！开始探索吧！";
        loadingDiv.style.background =
          "linear-gradient(to right, #00b09b, #96c93d)";
      }
    }, 2000);
  }

  // 工具函数
  function formatNumber(num) {
    if (num >= 10000) {
      return (num / 10000).toFixed(1) + "万";
    }
    return num.toLocaleString();
  }

  function getColor(percentage) {
    if (percentage > 40) return "#ff6b6b";
    if (percentage > 20) return "#4ecdc4";
    if (percentage > 10) return "#45b7d1";
    if (percentage > 5) return "#96ceb4";
    return "#ffeaa7";
  }

  // 模拟分享功能
  window.shareVR = function () {
    alert("🔗 VR体验链接已复制到剪贴板！\n可分享给好友一起体验");
  };

  window.takeScreenshot = function () {
    alert("📸 虚拟游览快照已保存！");
  };

  // 初始化所有功能
  function initAllFeatures() {
    if (document.querySelector(".ai-recommendation")) {
      initAIRecommendation();
    }

    if (document.querySelector(".data-analysis")) {
      initDataAnalysis();
    }

    if (document.querySelector(".vr-experience")) {
      initVRExperience();
    }
  }

  // 启动增强功能
  initAllFeatures();
});
