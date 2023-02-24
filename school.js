let school_list = [];
let isEdit = false;
let editIndex = 0;

function addOrUpdateSchool() {
	let school = {
		name: $('#school_name').val().trim(),
		depart: $('#school_depart').val().trim(),
		enter_yr: $('#school_enter_yr').val(),
		enter_mon: $('#school_enter_mon').find(':selected').text(),
		leave_yr: $('#school_leave_yr').val(),
		leave_mon: $('#school_leave_mon').find(':selected').text(),
		status: $('input[name=school_status]:checked').val(),
		type: $('input[name=school_type]:checked').val(),
	};

	let pass = true;
	for (const [key, value] of Object.entries(school)) {
		// console.log(`${key}: ${value}`);
		$(`#school_${key}`).css('border-color', ' #ced4da');
		$(`label[for="school_${key}"] span.text-danger`).text('*');

		switch (key) {
			case 'name':
				if (value == '') {
					showRequired(key);
					pass = false;
				}
				break;
			case 'depart':
				if (value == '') {
					showRequired(key);
					pass = false;
				}
				break;
			case 'enter_yr':
				if (value == '') {
					showRequired(key);
					$(`label[for="school_enter"] span.text-danger`).text('*必填');
					pass = false;
				}
				break;
			case 'enter_mon':
				if (value == '月') {
					showRequired(key);
					$(`label[for="school_enter"] span.text-danger`).text('*必填');
					pass = false;
				}
				break;
			case 'leave_yr':
				if (value == '') {
					showRequired(key);
					$(`label[for="school_leave"] span.text-danger`).text('*必填');
					pass = false;
				}
				break;
			case 'leave_mon':
				if (value == '月') {
					showRequired(key);
					$(`label[for="school_leave"] span.text-danger`).text('*必填');
					pass = false;
				}
				break;
			case 'status':
				if (value == null) {
					$(`label[for="school_${key}"] span.text-danger`).text('*必填');
					pass = false;
				}
				break;
			case 'type':
				if (value == null) {
					$(`label[for="school_${key}"] span.text-danger`).text('*必填');
					pass = false;
				}
				break;
		}
	}

	if (pass) {
		if (!isEdit) {
			school_list.push(school);
			setSchoolContent();
		} else {
			school_list[editIndex] = school;
			setSchoolContent();
		}
		isEdit = false;
		editIndex = 0;
	}
}

function editSchool(e) {
	isEdit = true;
	showSchoolForm();
	let key = e.parentElement.parentElement.getAttribute('key');
	editIndex = key;
	$('#school_name').val(school_list[key].name);
	$('#school_depart').val(school_list[key].depart);
	$('#school_enter_yr').val(school_list[key].enter_yr);
	$('#school_enter_mon').val(school_list[key].enter_mon);
	$('#school_leave_yr').val(school_list[key].leave_yr);
	$('#school_leave_mon').val(school_list[key].leave_mon);
	$(`input[name=school_status][value="${school_list[key].status}"]`).prop('checked', true);
	$(`input[name=school_type][value="${school_list[key].type}"]`).prop('checked', true);
	// console.log(e.parentElement.parentElement.getAttribute('key'));
}

function deleteSchool(e) {
	let key = e.parentElement.parentElement.getAttribute('key');
	school_list.splice(key, 1);
	setSchoolContent();
}

function showSchoolForm() {
	$('#school_content').html(`
    <div class="row">
    <div class="col-sm">
      <div class="form-group">
        <label for="school_name">
          <span>學校名稱</span>
          <span class="text-danger">*</span>
        </label>
        <input type="text" name="" id="school_name" class="form-control" />
      </div>
    </div>
    <div class="col-sm">
      <div class="form-group">
        <label for="school_depart">
          <span>科、系別</span>
          <span class="text-danger">*</span>
        </label>
        <input type="text" name="" id="school_depart" class="form-control" />
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-sm">
      <div class="form-group">
        <label for="school_enter">
          <span>入校年月</span>
          <span class="text-danger">*</span>
        </label>
        <div class="d-flex" style="gap: 10px">
          <input type="number" name="" id="school_enter_yr" class="form-control" placeholder="年" />
          <select name="" id="school_enter_mon" class="form-control">
            <option value="" hidden>月</option>
          </select>
        </div>
      </div>
    </div>
    <div class="col-sm">
      <div class="form-group">
        <label for="school_leave">
          <span>離校年月</span>
          <span class="text-danger">*</span>
        </label>
        <div class="d-flex" style="gap: 10px">
          <input type="number" name="" id="school_leave_yr" class="form-control" placeholder="年" />
          <select name="" id="school_leave_mon" class="form-control">
            <option value="" hidden>月</option>
          </select>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-sm">
      <div class="form-group">
        <label for="school_status">
          <span>就學狀態</span>
          <span class="text-danger">*</span>
        </label>
        <div class="d-flex" style="gap: 10px">
          <div class="form-check">
            <input type="radio" name="school_status" value="畢業" class="form-check-input" />
            <label for="" class="form-check-label">畢業</label>
          </div>
          <div class="form-check">
            <input type="radio" name="school_status" value="肄業" class="form-check-input" />
            <label for="" class="form-check-label">肄業</label>
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm">
      <div class="form-group">
        <label for="school_type">
          <span>日夜間部</span>
          <span class="text-danger">*</span>
        </label>
        <div class="d-flex" style="gap: 10px">
          <div class="form-check">
            <input type="radio" name="school_type" class="form-check-input" value="日間部" />
            <label for="" class="form-check-label">日間部</label>
          </div>
          <div class="form-check">
            <input type="radio" name="school_type" class="form-check-input" value="夜間部" />
            <label for="" class="form-check-label">夜間部</label>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-sm text-center">
      <div class="form-group">
        <button id="school_cancel" class="btn btn-outline-info" onclick="setSchoolContent()">取消</button>
        <button id="school_save" class="btn btn-info" onclick="addOrUpdateSchool()">儲存</button>
      </div>
    </div>
  </div>
  `);
	$('#school_enter_yr').attr({
		max: new Date().getFullYear(),
		min: 1940,
	});
	$('#school_leave_yr').attr({
		max: new Date().getFullYear(),
		min: 1940,
	});
	for (var i = 1; i < 13; i++) {
		$('<option/>', {
			value: i,
			text: i,
		}).appendTo('#school_enter_mon');
		$('<option/>', {
			value: i,
			text: i,
		}).appendTo('#school_leave_mon');
	}
}

function setSchoolContent() {
	let school_centent = '';
	$.each(school_list, function (index, item) {
		school_centent += `
      <div key="${index}" class="row align-items-center mb-3 row-hover">
        <div class="col-sm">
          <h5 class="mr-2 d-inline font-weight-bold">${item.name}</h5>
          <span class="text-secondary h6">${item.enter_yr}/${item.enter_mon} ~ ${item.leave_yr}/${item.leave_mon}</span>
          <div class="text-secondary d-flex align-items-center h6">
            <span>${item.depart}(${item.type})</span><span class="pl-1 pr-1">|</span><span>${item.status}</span>
          </div>
        </div>
        <div class="col-sm text-right">
          <button type="button" class="btn btn-sm btn-outline-info" onclick="editSchool(this)">
            <i class="bi bi-pencil-square"></i>
          </button>
          <button type="button" class="btn btn-sm btn-outline-info" onclick="deleteSchool(this)">
            <i class="bi bi-trash3"></i>
          </button>
        </div>
      </div>
      `;
	});

	$('#school_content').html(school_centent);
}

function setContactAddr() {
	$('#copy_addr').is(':checked') ? $('#contact_addr').val($('#residence_addr').val().trim()) : $('#contact_addr').val('');
}

function showRequired(key) {
	$(`#school_${key}`).css('border-color', 'red');
	$(`#school_${key}`).focus();
	$(`label[for="school_${key}"] span.text-danger`).text('*必填');
}
