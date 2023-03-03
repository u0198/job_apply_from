let work_list = [];
let isEditWork = false;
let editWorkIdx = 0;

function showWorkForm() {
	$('#work_content').html(`
	<div class="row">
			<div class="col-sm">
				<div class="form-group">
					<label for="work_place">
						<span>服務處所名稱</span>
						<span class="text-danger">*</span>
					</label>
					<input type="text" id="work_place" class="form-control work" />
				</div>
			</div>
			<div class="col-sm">
				<div class="form-group">
					<label for="work_job">
						<span>擔任職務</span>
						<span class="text-danger">*</span>
					</label>
					<input type="text" id="work_job" class="form-control work" />
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm">
				<div class="form-group">
					<label for="work_begin">
						<span>到職日</span>
						<span class="text-danger">*</span>
					</label>
					<input type="text" id="work_begin" class="form-control work" name="datepicker" />
				</div>
			</div>
			<div class="col-sm">
				<div class="form-group">
					<label for="work_end" class="d-flex justify-content-between">
						<div>
							<span>離職日</span>
							<span class="text-danger">*</span>
						</div>
						<div>
							<input type="checkbox" id="isWorking" onclick="toggleWorkEnd()" />
							<label for="isWorking" class="form-check-inline mt-0 mb-0">仍在職</label>
						</div>
					</label>
					<input type="text" id="work_end" class="form-control work" name="datepicker" />
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm">
				<div class="form-group">
					<label for="work_salary">
						<span>離職時薪資</span>
						<span class="text-danger">*</span>
					</label>
					<div class="d-md-flex" style="gap: 10px">
						<select name="" id="salary_curr" class="form-control">
							<option value="NTD">NTD</option>
							<option value="RMB">RMB</option>
						</select>
						<input type="number" id="salary_mon" class="form-control work" placeholder="月薪" />
						<input type="number" id="salary_yr" class="form-control work" placeholder="年薪" />
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm">
				<div class="form-group">
					<label for="work_leave">
						<span>離職原因</span>
						<span class="text-danger">*</span>
					</label>
					<input type="text" id="work_leave" class="form-control work" />
				</div>
			</div>
			<div class="col-sm">
				<div class="form-group">
					<label for="work_addr">
						<span>地點</span>
						<span class="text-danger">*</span>
					</label>
					<input type="text" id="work_addr" class="form-control work" />
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm">
				<div class="form-group">
					<label for="work_supervisor">
						<span>服務單位主管</span>
						<span class="text-danger">*</span>
					</label>
					<div class="d-md-flex" style="gap: 10px">
						<input type="text" id="supervisor_name" class="form-control work" placeholder="姓名˙" />
						<input type="text" id="supervisor_title" class="form-control work" placeholder="職稱" />
						<input type="text" id="supervisor_relation" class="form-control work" placeholder="與本人工作上關係" />
						<input type="text" id="supervisor_contact" class="form-control work" placeholder="連絡電話" />
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-sm text-center">
				<div class="form-group">
					<button id="work_cancel" class="btn btn-outline-info" onclick="setWorkContent()">取消</button>
					<button id="work_save" class="btn btn-info" onclick="addOrUpdateWork()">儲存</button>
				</div>
			</div>
		</div>
	`);

	$('input[name="datepicker"]').daterangepicker({
		singleDatePicker: true,
		showDropdowns: true,
		locale: {
			format: 'YYYY/MM/DD',
			applyLabel: '確認',
			cancelLabel: '取消',
			daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
			monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
			firstDay: 1,
		},
	});
	$('input[name="datepicker"]').val('');
}

function addOrUpdateWork() {
	let work = {
		place: $('#work_place').val().trim(),
		job: $('#work_job').val().trim(),
		begin: $('#work_begin').val().trim(),
		end: $('#work_end').val().trim(),
		salary_curr: $('#salary_curr').find(':selected').text(),
		salary_mon: $('#salary_mon').val().trim(),
		salary_yr: $('#salary_yr').val().trim(),
		leave: $('#work_leave').val().trim(),
		addr: $('#work_addr').val().trim(),
		supervisor_name: $('#supervisor_name').val().trim(),
		supervisor_title: $('#supervisor_title').val().trim(),
		supervisor_relation: $('#supervisor_relation').val().trim(),
		supervisor_contact: $('#supervisor_contact').val().trim(),
	};

	let pass = true;
	//欄位驗證
	var workinput = document.querySelectorAll('.work');
	workinput.forEach((i) => {
		if ($('#isWorking').is(':checked')) {
			if (i.value == '' && i.id != 'work_end') {
				i.style.borderColor = 'red';
				$('label[for="work_validation"]').text('請填寫欄位!');
				pass = false;
			} else i.style.borderColor = '#ced4da';
		} else {
			if (i.value == '') {
				i.style.borderColor = 'red';
				$('label[for="work_validation"]').text('請填寫欄位!');
				pass = false;
			} else i.style.borderColor = '#ced4da';
		}
	});

	if (pass) {
		$('label[for="work_validation"]').text('');
		if (!isEditWork) {
			work_list.push(work);
			setWorkContent();
		} else {
			work_list[editWorkIdx] = work;
			setWorkContent();
		}
		isEditWork = false;
		editWorkIdx = 0;
	}
}

function setWorkContent() {
	let work_content = '';
	$.each(work_list, function (index, item) {
		work_content += `
		<div key="${index}" class="row align-items-center mb-3 row-hover">
			<div class="col-sm">
				<h5 class="mr-2 d-inline font-weight-bold">${item.place}</h5>
				<span class="text-secondary h6">${item.begin} ~ ${item.end}</span>
				<p class="text-secondary d-flex align-items-center h6">${item.job}</p>
			</div>
			<div class="col-sm text-right">
				<button type="button" class="btn btn-sm btn-outline-info" onclick="editWork(this)">
					<i class="bi bi-pencil-square"></i>
				</button>
				<button type="button" class="btn btn-sm btn-outline-info" onclick="deleteWork(this)">
					<i class="bi bi-trash3"></i>
				</button>
			</div>
		</div>
		`;
	});

	$('#work_content').html(work_content);
}

function editWork(e) {
	// console.log(work_list);
	isEditWork = true;
	showWorkForm();
	let key = e.parentElement.parentElement.getAttribute('key');
	editWorkIdx = key;
	$('#work_place').val(work_list[key].place);
	$('#work_job').val(work_list[key].job);
	$('#work_begin').val(work_list[key].begin);
	if (work_list[key].end == '') {
		$('#isWorking').prop('checked', true);
		$('#work_end').prop('disabled', true);
	} else {
		$('#work_end').val(work_list[key].end);
	}
	$('#salary_curr').val(work_list[key].salary_curr);
	$('#salary_mon').val(work_list[key].salary_mon);
	$('#salary_yr').val(work_list[key].salary_yr);
	$('#work_leave').val(work_list[key].leave);
	$('#work_addr').val(work_list[key].addr);
	$('#supervisor_name').val(work_list[key].supervisor_name);
	$('#supervisor_title').val(work_list[key].supervisor_title);
	$('#supervisor_relation').val(work_list[key].supervisor_relation);
	$('#supervisor_contact').val(work_list[key].supervisor_contact);
}

function deleteWork(e) {
	let key = e.parentElement.parentElement.getAttribute('key');
	work_list.splice(key, 1);
	setWorkContent();
}

function toggleWorkEnd() {
	$('#work_end').val('');
	if ($('#isWorking').is(':checked')) {
		$(`label[for="work_end"] span.text-danger`).text('');
		$('#work_end').prop('disabled', true);
	} else {
		$(`label[for="work_end"] span.text-danger`).text('*');
		$('#work_end').prop('disabled', false);
	}
}
