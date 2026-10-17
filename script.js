let currentFile = null;

// Lắng nghe sự kiện chọn file từ thiết bị
document.getElementById('fileInput').addEventListener('change', function(e) {
  currentFile = e.target.files[0];
  const status = document.getElementById('fileName');
  
  if (currentFile) {
    status.textContent = `Đã chọn: ${currentFile.name} (${(currentFile.size / 1024).toFixed(1)} KB)`;
    status.style.color = '#4ade80';
  } else {
    status.textContent = 'Chưa có file nào được chọn';
    status.style.color = '#f59e0b';
  }
});

// Chuyển đổi màu Hex sang RGBA mảng 4 số Float32 (16 bytes)
function hexToRGBAFloat(hex) {
  let c = hex.replace('#', '');
  if (c.length === 6) c += 'ff';
  
  const r = parseInt(c.substring(0, 2), 16) / 255;
  const g = parseInt(c.substring(2, 4), 16) / 255;
  const b = parseInt(c.substring(4, 6), 16) / 255;
  const a = parseInt(c.substring(6, 8), 16) / 255;

  return [r, g, b, a];
}

// Xử lý khi nhấn nút Tạo File
document.getElementById('btnProcess').addEventListener('click', function() {
  if (!currentFile) {
    alert('Vui lòng chọn file bundle trước!');
    return;
  }

  const reader = new FileReader();

  reader.onload = function(e) {
    const arrayBuffer = e.target.result;
    const uint8Array = new Uint8Array(arrayBuffer);

    const isWallhack = document.getElementById('wallhack').checked;
    const hexColor = document.getElementById('rimColor').value;
    const rgba = hexToRGBAFloat(hexColor);

    /* 
      ======================================================
      LOGIC SỬA BYTE TRỰC TIẾP TRÊN ARRAYBUFFER / UINT8ARRAY
      ======================================================
      Ví dụ: Tìm chuỗi byte đặc trưng của Render State / zTest 
      và thay đổi giá trị từ 4 (LEqual) thành 8 (Always).
    */

    // Demo: Duyệt mảng Byte để tìm kiếm và thay đổi giá trị mong muốn
    // (Lưu ý: Đoạn mã bên dưới chỉ minh họa thuật toán thay đổi byte)
    if (isWallhack) {
      // Logic thay thế giá trị zTest trong shader
      for (let i = 0; i < uint8Array.length - 4; i++) {
        // Tìm pattern đặc trưng của Shader Param nếu có
      }
    }

    // Tạo file mới từ mảng Byte đã chỉnh sửa
    const blob = new Blob([uint8Array], { type: 'application/octet-stream' });
    const downloadUrl = URL.createObjectURL(blob);

    // Hiển thị nút Tải File
    const btnDownload = document.getElementById('btnDownload');
    btnDownload.href = downloadUrl;
    btnDownload.download = currentFile.name; // Giữ nguyên tên file gốc
    btnDownload.style.display = 'block';
    btnDownload.textContent = `📥 Tải file: ${currentFile.name}`;

    alert('Đã xử lý file thành công!');
  };

  reader.readAsArrayBuffer(currentFile);
});
