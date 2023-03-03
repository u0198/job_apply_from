let family_list = [];
let isEditFamily = false;
let editFamilyIdx = 0;

function showFamilyForm() {
	$('#family_content').html(`
  <div class="row">
  <div class="col-sm">
    <div class="form-group">
      <label for="family_title">稱謂</label>
      <select id="family_title" class="form-control fam">
        <option value=""></option>
        <option value="丈夫">丈夫</option>
        <option value="妻子">妻子</option>
        <option value="父親">父親</option>
        <option value="母親">母親</option>
        <option value="兒子">兒子</option>
        <option value="女兒">女兒</option>
        <option value="哥哥">哥哥</option>
        <option value="弟弟">弟弟</option>
        <option value="姐姐">姐姐</option>
        <option value="妹妹">妹妹</option>
        <option value="其他">其他</option>
      </select>
    </div>
  </div>
  <div class="col-sm">
    <div class="form-group">
      <label for="family_name">姓名</label>
      <input type="text" name="" id="family_name" class="form-control fam" />
    </div>
  </div>
  <div class="col-sm">
    <div class="form-group">
      <label for="family_age">年齡</label>
      <input type="number" name="" id="family_age" class="form-control fam" />
    </div>
  </div>
</div>
<div class="row">
  <div class="col-sm">
    <div class="form-group">
      <label for="family_degree">學歷</label>
      <select name="" id="family_degree" class="form-control fam">
        <option value=""></option>
        <option value="博士">博士</option>
        <option value="碩士">碩士</option>
        <option value="大學">大學</option>
        <option value="四技">四技</option>
        <option value="二技">二技</option>
        <option value="二專">二專</option>
        <option value="三專">三專</option>
        <option value="五專">五專</option>
        <option value="高中">高中</option>
        <option value="高職">高職</option>
        <option value="國中(含)以下">國中(含)以下</option>
      </select>
    </div>
  </div>
  <div class="col-sm">
    <div class="form-group">
      <label for="family_job">職業</label>
      <input type="text" name="" id="family_job" class="form-control fam" />
    </div>
  </div>
</div>
<div class="row">
  <div class="col-sm text-center">
    <div class="form-group">
      <button id="family_cancel" class="btn btn-outline-info" onclick="setFamilyContent()">取消</button>
      <button id="family_save" class="btn btn-info" onclick="addOrUpdateFamily()">儲存</button>
    </div>
  </div>
</div>
  `);
}

function addOrUpdateFamily() {
	let family = {
		title: $('#family_title').find(':selected').text(),
		name: $('#family_name').val().trim(),
		age: $('#family_age').val().trim(),
		degree: $('#family_degree').find(':selected').text(),
		job: $('#family_job').val().trim(),
	};

	let pass = true;
	//欄位驗證
	var famInput = document.querySelectorAll('.fam');
	famInput.forEach((i) => {
		// console.log(i.value);
		if (i.value == '') {
			i.style.borderColor = 'red';
			$('label[for="family_validation"]').text('請填寫欄位!');
			pass = false;
		} else i.style.borderColor = '#ced4da';
	});

	if (pass) {
		debugger;
		$('label[for="family_validation"]').text('');
		if (!isEditFamily) {
			family_list.push(family);
			setFamilyContent();
		} else {
			family_list[editWorkIdx] = family;
			setFamilyContent();
		}
		isEditFamily = false;
		editFamilyIdx = 0;
	}
}

function setFamilyContent() {
	let family_content = '';
	if (family_list.length > 0) {
		family_content = `
    <thead>
      <tr>
        <th>稱謂</th>
        <th>姓名</th>
        <th>年齡</th>
        <th>學歷</th>
        <th>職業</th>
        <th></th>
      </tr>
    </thead>
  `;
	}

	let $table = $('<table>', { class: 'table table-bordered' });

	$.each(family_list, function (index, item) {
		family_content += `
    <tr key="${index}">
      <td>${item.title}</td>
      <td>${item.name}</td>
      <td>${item.age}</td>
      <td>${item.degree}</td>
      <td>${item.job}</td>
      <th>
        <button type="button" class="btn btn-sm btn-outline-info" onclick="editFamily(this)">
          <i class="bi bi-pencil-square"></i>
        </button>
        <button type="button" class="btn btn-sm btn-outline-info" onclick="deleteFamily(this)">
          <i class="bi bi-trash3"></i>
        </button>
      </th>
    </tr>
    `;
	});
	$table.html(family_content);
	$('#family_content').html($table);
}

function editFamily(e) {
	isEditFamily = true;
	showFamilyForm();
	let key = e.parentElement.parentElement.getAttribute('key');
	editFamilyIdx = key;
	$('#family_title').val(family_list[key].title);
	$('#family_name').val(family_list[key].name);
	$('#family_age').val(family_list[key].age);
	$('#family_degree').val(family_list[key].degree);
	$('#family_job').val(family_list[key].job);
}

function deleteFamily(e) {
	let key = e.parentElement.parentElement.getAttribute('key');
	family_list.splice(key, 1);
	setFamilyContent();
}
