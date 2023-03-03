let compete_list = [];
let isEditCompete = false;
let editCompeteIdx = 0;

function showCompeteForm() {
	$('#compete_content').html(`
  <div class="row">
  <div class="col-sm">
    <div class="form-group">
      <label for="compete_name">
        <span>姓名</span>
        <span class="text-danger">*</span>
      </label>
      <input type="text" name="" id="compete_name" class="form-control comp" />
    </div>
  </div>
  <div class="col-sm">
    <div class="form-group">
      <label for="compete_relation">
        <span>關係</span>
        <span class="text-danger">*</span>
      </label>
      <input type="text" name="" id="compete_relation" class="form-control comp" />
    </div>
  </div>
  <div class="col-sm">
    <div class="form-group">
      <label for="compete_company">
        <span>任職公司</span>
        <span class="text-danger">*</span>
      </label>
      <input type="text" name="" id="compete_company" class="form-control comp" />
    </div>
  </div>
</div>
<div class="row">
  <div class="col-sm">
    <div class="form-group">
      <label for="compete_job">
        <span>擔任職務</span>
        <span class="text-danger">*</span>
      </label>
      <input type="text" name="" id="compete_job" class="form-control comp" />
    </div>
  </div>
  <div class="col-sm">
    <div class="form-group">
      <label for="compete_title">
        <span>職稱</span>
        <span class="text-danger">*</span>
      </label>
      <input type="text" name="" id="compete_title" class="form-control comp" />
    </div>
  </div>
</div>
<div class="row">
  <div class="col-sm text-center">
    <div class="form-group">
      <button id="compete_cancel" class="btn btn-outline-info" onclick="setCompeteContent()">取消</button>
      <button id="compete_save" class="btn btn-info" onclick="addOrUpdateCompete()">儲存</button>
    </div>
  </div>
</div>
  `);
}

function addOrUpdateCompete() {
	let compete = {
		name: $('#compete_name').val().trim(),
		relation: $('#compete_relation').val().trim(),
		company: $('#compete_company').val().trim(),
		job: $('#compete_job').val().trim(),
		title: $('#compete_title').val().trim(),
	};

	let pass = true;
	//欄位驗證
	var compInput = document.querySelectorAll('.comp');
	compInput.forEach((i) => {
		if (i.value == '') {
			i.style.borderColor = 'red';
			$('label[for="compete_validation"]').text('請填寫欄位!');
			pass = false;
		} else i.style.borderColor = '#ced4da';
	});
}

function setCompeteContent() {}
