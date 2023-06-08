// Biến toàn cục mảng 2 chiều chứa tất cả các học viên
let listStudent = [
    ['SV001', "Nguyễn Văn A", "abc@gmail.com", '0355914029', 'Hà Nội', 'Male']
];
let action = "create";
// Hàm render dữ liệu từ listStudent ra table
function renderData() {
    // Lấy ra phần tử được render dữ liệu
    let tbody = document.getElementById("content");
    // Đặt tbody chưa chứa dữ liệu
    tbody.innerHTML = "";
    for (let index = 0; index < listStudent.length; index++) {
        // render dữ liệu từng tr của tbody
        tbody.innerHTML += `<tr>
                            <td>${index + 1}</td>
                            <td>${listStudent[index][0]}</td>
                            <td>${listStudent[index][1]}</td>
                            <td>${listStudent[index][2]}</td>
                            <td>${listStudent[index][3]}</td>
                            <td>${listStudent[index][4]}</td>
                            <td>${listStudent[index][5]}</td>
                            <td>
                                <button onclick="editStudent('${listStudent[index][0]}')">Edit</button>
                                <button onclick="deleteStudent('${listStudent[index][0]}')">Delete</button>
                            </td>
                        </tr>`
    }
}
// Hàm validate dữ liệu khách hàng nhập vào khi thêm mới hoặc cập nhật
function validateForm() {
    // 1. Lấy dữ liệu từ form
    let studentId = document.getElementById("studentId").value;
    let studentName = document.getElementById("studentName").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;
    let sex = document.querySelector("input[name='sex']:checked").value;
    // 2. Thực hiện validate, nếu thỏa mãn --> true, có lỗi thông báo --> false
    // Validate studentId
    if (studentId == "") {
        alert("Vui lòng nhập mã sinh viên");
        return false;
    }
    // Validate studentID bị trùng
    let index = getStudentByStudentId(studentId);
    if (index >= 0) {
        alert("Mã sinh viên đã tồn tại, vui lòng nhập lại");
        return false;
    }
    // Validate student Name
    if (studentName == "") {
        alert("Vui lòng nhập vào họ và tên");
        return false;
    }
    // Validate email
    let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(emailPattern)) {
        alert("Vui lòng nhập email đúng định dạng");
        return false;
    }
    // Validate phone
    let phonePattern = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    if (!phone.match(phonePattern)) {
        alert("Vui lòng nhập phone đúng định dạng");
        return false;
    }
    // Validate address
    if (address == "") {
        alert("Vui lòng nhập địa chỉ");
        return false;
    }

    return true;
}

// Hàm thực hiện thêm mới hoặc cập nhật sinh viên
function createOrEdit() {
    if (validateForm()) {
        // 1. Lấy dữ liệu từ form
        let studentId = document.getElementById("studentId").value;
        let studentName = document.getElementById("studentName").value;
        let email = document.getElementById("email").value;
        let phone = document.getElementById("phone").value;
        let address = document.getElementById("address").value;
        let sex = document.querySelector("input[name='sex']:checked").value;
        if (action == "create") {
            // Thực hiện thêm mới sinh viên            
            // 2. push sinh viên vào mảng 2 chiều listStudent
            listStudent.push([studentId, studentName, email, phone, address, sex]);

        } else {
            // Thực hiện cập nhật sinh viên
            // 2. Lấy chỉ số sinh viên trong mảng
            let index = getStudentByStudentId(studentId);
            // 3. tiến hành cập nhật
            listStudent[index][1] = studentName;
            listStudent[index][2] = email;
            listStudent[index][3] = phone;
            listStudent[index][4] = address;
            listStudent[index][5] = sex;
            // Cho phép nhập studentId
            document.getElementById("studentId").readOnly = false;
        }
        // Xóa dữ liệu trên form khi thêm mới hoặc cập nhật
        document.getElementById("studentId").value = "";
        document.getElementById("studentName").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("address").value = "";
        document.getElementById("male").checked = true;
        // Render lại dữ liệu trên table
        renderData();
    }
}
// Hàm lấy chỉ số sinh viên trong listStudent từ studentId
function getStudentByStudentId(studentId) {
    for (let index = 0; index < listStudent.length; index++) {
        if (studentId == listStudent[index][0]) {
            return index;
        }
    }
    return -1;
}

// Hàm thực hiện lấy studentId từ table, lấy dữ liệu từ listStudent và fill lên form
function editStudent(studentId) {
    // 1. Lấy chỉ số sinh viên trong mảng
    let index = getStudentByStudentId(studentId);
    if (index >= 0) {
        // 2. fill thông tin sinh viên ra form
        document.getElementById("studentId").value = listStudent[index][0];
        document.getElementById("studentName").value = listStudent[index][1];
        document.getElementById("email").value = listStudent[index][2];
        document.getElementById("phone").value = listStudent[index][3];
        document.getElementById("address").value = listStudent[index][4];
        if (listStudent[index][5] == "Male") {
            document.getElementById("male").checked = true;
        } else {
            document.getElementById("female").checked = true;
        }
        // Đổi action = edit
        action = "edit";
        // Để studentId thành readOnly
        document.getElementById("studentId").readOnly = true;

    }
}

// Hàm thực hiện xóa sinh viên
function deleteStudent(studentId) {
    // 1. Lấy index sinh viên trong mảng
    let index = getStudentByStudentId(studentId);
    // 2. Thực hiện xóa theo index
    listStudent.splice(index, 1);
    // 3. render lại dữ liệu
    renderData();
}

// Khi trình duyệt load thì sẽ load dữ liệu student và hiển thị trên table
document.onload = renderData();
// Truy cập vào phần tử save và gắn sự kiện click
let btnSave = document.getElementById("btnSave");
btnSave.addEventListener("click", function (event) {
    // Chặn sự kiện submit default của form
    event.preventDefault();
    createOrEdit()
});