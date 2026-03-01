// attraction.js - 景点详情页逻辑
document.addEventListener("DOMContentLoaded", function () {
  // 1. 获取URL参数中的景点名称
  const urlParams = new URLSearchParams(window.location.search);
  const attractionName = urlParams.get("name");

  // 2. 如果没有景点名称参数，显示错误
  if (!attractionName) {
    showDataError("未指定景点名称");
    return;
  }

  // 3. 从数据中查找景点
  const attractionData = attractionsData[attractionName];

  // 4. 如果找不到景点数据，显示错误
  if (!attractionData) {
    showDataError(`找不到景点"${attractionName}"的数据`);
    return;
  }

  // 5. 加载景点数据到页面
  loadAttractionData(attractionData);
});

// 加载景点数据到页面的函数
function loadAttractionData(data) {
  // 设置页面标题
  document.title = `${data.title} - 景点推荐探索器`;

  // 设置景点标题
  document.getElementById("attraction-title").textContent = data.title;

  // 设置基本信息
  if (data.basicInfo) {
    document.getElementById("info-location").textContent =
      data.basicInfo.location || "信息待补充";
    document.getElementById("info-openTime").textContent =
      data.basicInfo.openTime || "信息待补充";
    document.getElementById("info-ticket").textContent =
      data.basicInfo.ticket || "信息待补充";
    document.getElementById("info-bestSeason").textContent =
      data.basicInfo.bestSeason || "信息待补充";
  }

  // 设置主场景
  const mainSceneImg = document.getElementById("main-scene-img");
  const mainImagePlaceholder = document.getElementById(
    "main-image-placeholder",
  );
  const mainSceneDesc = document.getElementById("main-scene-desc");

  if (data.mainScene) {
    // 设置主场景图片
    if (data.mainScene.img) {
      mainSceneImg.src = data.mainScene.img;
      mainSceneImg.alt = `${data.title}主场景`;
      mainSceneImg.onload = function () {
        mainImagePlaceholder.style.display = "none";
      };
      mainSceneImg.onerror = function () {
        // 如果图片加载失败，显示占位符
        mainImagePlaceholder.textContent = "图片加载失败，请检查图片路径";
        mainImagePlaceholder.style.display = "flex";
      };
    } else {
      mainImagePlaceholder.textContent = "暂无主场景图片";
      mainImagePlaceholder.style.display = "flex";
    }

    // 设置主场景描述
    if (data.mainScene.desc) {
      mainSceneDesc.textContent = data.mainScene.desc;
    } else {
      mainSceneDesc.textContent = "景点描述信息待补充...";
    }
  }

  // 设置副场景
  const subScenesContainer = document.getElementById("sub-scenes-container");
  subScenesContainer.innerHTML = ""; // 清空示例内容

  if (data.subScenes && data.subScenes.length > 0) {
    data.subScenes.forEach((scene, index) => {
      // 创建副场景项目
      const subSceneItem = document.createElement("div");
      subSceneItem.className = "sub-scene-item";

      // 创建副场景图片容器
      const imgContainer = document.createElement("div");
      imgContainer.className = "sub-scene-img-container";

      const img = document.createElement("img");
      img.className = "sub-scene-img";
      img.src = scene.img || "";
      img.alt = `${data.title}副场景${index + 1}`;

      const imgPlaceholder = document.createElement("div");
      imgPlaceholder.className = "image-placeholder";
      imgPlaceholder.textContent = `副场景${index + 1}`;

      // 图片加载成功时隐藏占位符
      img.onload = function () {
        imgPlaceholder.style.display = "none";
      };

      // 图片加载失败时显示占位符
      img.onerror = function () {
        imgPlaceholder.textContent = `图片${index + 1}加载失败`;
        imgPlaceholder.style.display = "flex";
      };

      imgContainer.appendChild(img);
      imgContainer.appendChild(imgPlaceholder);

      // 创建副场景描述
      const descContainer = document.createElement("div");
      descContainer.className = "sub-scene-desc";

      const desc = document.createElement("p");
      desc.textContent = scene.desc || `副场景${index + 1}描述待补充`;

      descContainer.appendChild(desc);

      // 组合元素
      subSceneItem.appendChild(imgContainer);
      subSceneItem.appendChild(descContainer);

      // 添加到容器
      subScenesContainer.appendChild(subSceneItem);
    });
  } else {
    // 如果没有副场景数据
    const noSubScenes = document.createElement("div");
    noSubScenes.className = "no-subscenes";
    noSubScenes.innerHTML = "<p>暂无副场景信息，欢迎补充！</p>";
    subScenesContainer.appendChild(noSubScenes);
  }
}

// 显示数据错误信息的函数
function showDataError(message) {
  // 隐藏主要内容
  document.querySelector(".attraction-container").style.display = "none";

  // 显示错误信息
  const errorElement = document.getElementById("data-error");
  errorElement.classList.remove("hidden");

  // 可以在这里设置具体的错误信息
  console.error(message);
}
