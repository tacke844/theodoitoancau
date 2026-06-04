// Danh sách thông báo mẫu
const notifications = [
    "Tài khoản 0399xxx090 kích hoạt thành công",
    "Tài khoản 0912xxx345 đã được cập nhật",
    "Tài khoản 0987xxx123 kích hoạt thành công",
    "Tài khoản 0901xxx567 đã được xác thực",
    "Tài khoản 0913xxx890 kích hoạt thành công",
    "Tài khoản 0988xxx234 đã được cập nhật",
    "Tài khoản 0909xxx678 kích hoạt thành công"
];

// Biến global để lưu trữ timer
let notificationTimer;
let countdownTimer;

// Khởi tạo khi trang load
document.addEventListener("DOMContentLoaded", function () {
    initializeApp();
});

function initializeApp() {
    // Ẩn tất cả các màn hình trừ màn hình chọn icon ban đầu
    hideAllScreens();
    document.getElementById("iconSelectionScreen").classList.remove("hidden");

    // Xử lý sự kiện click vào icon
    document.querySelectorAll(".icon-item").forEach(icon => {
        icon.addEventListener("click", showLoginScreen);
    });

    // Xử lý sự kiện đăng nhập
    document.getElementById("loginBtn").addEventListener("click", handleLogin);

    // Xử lý sự kiện chọn gói
    document.querySelectorAll(".package-btn").forEach(btn => {
        btn.addEventListener("click", handlePackageSelection);
    });

    // Xử lý sự kiện kích hoạt
    document.querySelectorAll(".activate-btn").forEach(btn => {
        btn.addEventListener("click", handleActivation);
    });
}

// Hiển thị thông báo chạy từ dưới lên
function startNotifications() {
    const notificationArea = document.getElementById("notificationArea");

    function showNotification() {
        const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];

        const notificationElement = document.createElement("div");
        notificationElement.className = "notification-scroll text-white text-sm p-2 bg-black/30 rounded mb-2";
        notificationElement.textContent = randomNotification;

        notificationArea.appendChild(notificationElement);

        // Xóa thông báo sau khi animation hoàn thành
        setTimeout(() => {
            if (notificationElement.parentNode) {
                notificationElement.parentNode.removeChild(notificationElement);
            }
        }, 3000);
    }

    // Hiển thị thông báo đầu tiên ngay lập tức
    showNotification();

    // Tiếp tục hiển thị thông báo mỗi 4 giây
    notificationTimer = setInterval(showNotification, 4000);
}

// Validate số điện thoại đơn giản
function validatePhoneNumber(phone) {
    // Kiểm tra số điện thoại có ít nhất 9 chữ số
    const phoneRegex = /^[0-9]{9,11}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
}

// Xử lý đăng nhập
async function handleLogin() {
    const countryCode = document.getElementById("countryCode").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const softwareCode = document.getElementById("softwareCode").value;

    // Validate input
    if (!phoneNumber || !softwareCode) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
        alert("Số điện thoại không hợp lệ!");
        return;
    }

    // Hiển thị loading
    showLoadingScreen();

    try {
        // Gọi API để kiểm tra mã phần mềm (mock API)
        const isValid = await validateSoftwareCode(softwareCode);

        if (isValid) {
            // Chuyển sang màn hình đăng ký gói sau khi loading hoàn thành
            setTimeout(() => {
                showPackageScreen();
            }, 3000);
        } else {
            alert("Mã phần mềm không chính xác!");
            showLoginScreen();
        }
    } catch (error) {
        alert("Có lỗi xảy ra, vui lòng thử lại!");
        showLoginScreen();
    }
}
// API endpoint
const API_URL = "https://eqje1a.mockapi.dog/";

// Gọi API để validate mã phần mềm
async function validateSoftwareCode(code) {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        if (data.length === 0) return false;

        // Lấy ma1 từ bản ghi đầu tiên
        const { ma1 } = data[0];
        return code.toUpperCase() === ma1.toUpperCase();
    } catch (error) {
        console.error("Lỗi khi gọi API validateSoftwareCode:", error);
        return false;
    }
}

// Gọi API để validate mã thuê bao
async function validateSubscriptionCode(code) {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();
        if (data.length === 0) return false;

        // Lấy ma2 từ bản ghi đầu tiên
        const { ma2 } = data[0];
        return code.toUpperCase() === ma2.toUpperCase();
    } catch (error) {
        console.error("Lỗi khi gọi API validateSubscriptionCode:", error);
        return false;
    }
}

// Mock API để lấy thời gian countdown
async function getCountdownTime() {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            // Mock: trả về thời gian countdown (4 phút 46 giây)
            resolve({
                days: 0,
                hours: 0,
                minutes: 4,
                seconds: 46
            });
        }, 500);
    });
}

// Hiển thị màn hình loading với progress bar
function showLoadingScreen() {
    hideAllScreens();
    document.getElementById("loadingScreen").classList.remove("hidden");

    // Dừng thông báo khi loading
    if (notificationTimer) {
        clearInterval(notificationTimer);
    }

    // Animate progress bar
    let progress = 0;
    const progressBar = document.getElementById("progressBar");
    const progressText = document.getElementById("progressText");
    // ✅ Reset về 0 mỗi lần bắt đầu
    progressBar.style.width = "0%";
    progressText.textContent = "0%";
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15 + 5; // Tăng ngẫu nhiên 5-20%
        if (progress > 100) progress = 100;

        progressBar.style.width = progress + "%";
        progressText.textContent = Math.round(progress) + "%";

        if (progress >= 100) {
            clearInterval(progressInterval);
        }
    }, 200);
}

// Xử lý chọn gói
function handlePackageSelection(event) {
    const button = event.target;
    const packageDiv = button.closest("div").querySelector(".package-input");

    // Ẩn tất cả input khác
    document.querySelectorAll(".package-input").forEach(input => {
        if (input !== packageDiv) {
            input.classList.add("hidden");
        }
    });

    // Hiển thị input cho gói được chọn
    packageDiv.classList.toggle("hidden");
}

// Xử lý kích hoạt
async function handleActivation(event) {
    const button = event.target;
    const input = button.parentNode.querySelector(".subscription-code");
    const subscriptionCode = input.value;

    if (!subscriptionCode) {
        alert("Vui lòng nhập mã thuê bao!");
        return;
    }

    // Hiển thị loading
    showLoadingScreen();

    try {
        // Gọi API để kiểm tra mã thuê bao
        const isValid = await validateSubscriptionCode(subscriptionCode);

        if (isValid) {
            // Chuyển sang màn hình chờ kích hoạt
            setTimeout(() => {
                showWaitingScreen();
            }, 3000);
        } else {
            alert("Mã thuê bao không chính xác!");
            showPackageScreen();
        }
    } catch (error) {
        alert("Có lỗi xảy ra, vui lòng thử lại!");
        showPackageScreen();
    }
}

// Hiển thị màn hình chờ kích hoạt với countdown
async function showWaitingScreen() {
    hideAllScreens();
    document.getElementById("waitingScreen").classList.remove("hidden");

    try {
        // Lấy thời gian countdown từ API
        const countdownData = await getCountdownTime();
        startCountdown(countdownData);
    } catch (error) {
        // Fallback nếu API lỗi
        startCountdown({ days: 0, hours: 0, minutes: 4, seconds: 46 });
    }
}

// Bắt đầu countdown timer
function startCountdown(initialTime) {
    let totalSeconds = initialTime.days * 86400 +
        initialTime.hours * 3600 +
        initialTime.minutes * 60 +
        initialTime.seconds;

    function updateCountdown() {
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        document.getElementById("days").textContent = days;
        document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
        document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");

        if (totalSeconds > 0) {
            totalSeconds--;
        } else {
            clearInterval(countdownTimer);
            alert("Kích hoạt hoàn tất!");
        }
    }

    // Cập nhật ngay lập tức
    updateCountdown();

    // Cập nhật mỗi giây
    countdownTimer = setInterval(updateCountdown, 1000);
}

// Utility functions để hiển thị/ẩn màn hình
function hideAllScreens() {
    document.getElementById("iconSelectionScreen").classList.add("hidden");
    document.getElementById("loginScreen").classList.add("hidden");
    document.getElementById("loadingScreen").classList.add("hidden");
    document.getElementById("packageScreen").classList.add("hidden");
    document.getElementById("waitingScreen").classList.add("hidden");
}

function showLoginScreen() {
    hideAllScreens();
    document.getElementById("loginScreen").classList.remove("hidden");
    startNotifications();
}

function showPackageScreen() {
    hideAllScreens();
    document.getElementById("packageScreen").classList.remove("hidden");
}

// Cleanup khi trang được unload
window.addEventListener("beforeunload", function () {
    if (notificationTimer) {
        clearInterval(notificationTimer);
    }
    if (countdownTimer) {
        clearInterval(countdownTimer);
    }
});

