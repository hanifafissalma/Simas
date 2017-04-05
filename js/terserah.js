

//pengaturan tanggal
$('.datepicker').pickadate({
  monthsFull:['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'December'],
  monthsShort:['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Dec'],
  weekdaysFull:['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
  weekdaysShort:['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
  selectMonths: true,
  selectYears: 50,
  closeOnSelect: true,
  closeOnClear: true,
  max: true,
  format: 'yyyy-mm-dd',
  formatSubmit: 'yyyy-mm-dd'
});

//menampilkan daftar agama
$.ajax({
	url:'http://localhost/simas-service/public/api/agama',
	type:'get',
	success:function(res){
		for(i in res.data){
			$('[name="agama"]').append(
				'<option value="'+res.data[i].kode_agama+'">'+res.data[i].nama_agama+'</option>'
			);
		}

		$('select').material_select();	//
	},
	error:function(res){
		console.log(res);
	}
})

//menampilkan daftar provinsi
$.ajax({
	url:'http://localhost/simas-service/public/api/provinsi',
	type:'get',
	success:function(res){
		for(i in res.data){
			$('[name="provinsi"]').append(
				'<option value="'+res.data[i].id+'">'+res.data[i].nama+'</option>'
			);
		}

		$('select').material_select();	//
	},
	error:function(res){
		console.log(res);
	}
})

//menampilkan daftar kabupaten/kota
$('[name=provinsi]').change(function(){
	var value=$(this).val();
	$('[name="kota"]').html('<option value=""   selected>Pilih Kabupaten/Kota</option>');
	$('[name="kecamatan"]').html('<option value=""   selected>Pilih Kecamatan</option>');
	$.ajax({
		url:'http://localhost/simas-service/public/api/kabkota/provinsi/'+value,
		type:'get',
		success:function(res){
			for(i in res.data){
				$('[name="kota"]').append(
					'<option value="'+res.data[i].id+'">'+res.data[i].nama+'</option>'
				);
			}

			$('select').material_select();	//
		},
		error:function(res){
			console.log(res);
		}
	})
})

//menampilkan daftar kecamatan
$('[name=kota]').change(function(){
	var value=$(this).val();
	$('[name="kecamatan"]').html('<option value=""   selected>Pilih Kecamatan</option>');
	$.ajax({
		url:'http://localhost/simas-service/public/api/kecamatan/kabkota/'+value,
		type:'get',
		success:function(res){
			for(i in res.data){
				$('[name="kecamatan"]').append(
					'<option value="'+res.data[i].id+'">'+res.data[i].nama+'</option>'
				);
			}

			$('select').material_select();	//
		},
		error:function(res){
			console.log(res);
		}
	})
})

//menampilkan jenjang pendidikan
$.ajax({
	url:'http://localhost/simas-service/public/api/jenjang',
	type:'get',
	success:function(res){
		for(i in res.data){
			$('[name="jenjang"]').append(
				'<option value="'+res.data[i].kode_jenjang_pendidikan+'">'+res.data[i].deskripsi+'</option>'
			);
		}
		$('select').material_select();	//
	},
	error:function(res){
		console.log(res);
	}
})

//menampilkan daftar fakultas
$.ajax({
	url:'http://localhost/simas-service/public/api/fakultas',
	type:'get',
	success:function(res){
		for(i in res.data){
			$('[name="fakultas"]').append(
				'<option value="'+res.data[i].kode_fakultas+'">'+res.data[i].nama_fakultas+'</option>'
			);
		}
		$('select').material_select();	//
	},
	error:function(res){
		console.log(res);
	}
})

//menampilan daftar prodi
$('[name=fakultas]').change(function(){
	var value=$(this).val();
	$('[name="prodi"]').html('<option value=""   selected>Pilih Program Studi</option>');
	$.ajax({
		url:'http://localhost/simas-service/public/api/prodi/fakultas/'+value,
		type:'get',
		success:function(res){
			for(i in res.data){
				$('[name="prodi"]').append(
					'<option value="'+res.data[i].kode_program_studi+'">'+res.data[i].nama_program_studi+'</option>'
				);
			}

			$('select').material_select();
		},
		error:function(res){
			console.log(res);
		}
	})
})

//menampilkan data diri user
$.ajax({
	url: 'http://localhost/simas-service/public/api/dataDiri',
	type: 'get',
	beforeSend: function (xhr) {
    	xhr.setRequestHeader('Authorization', 'bearer '+ getCookie('princess'));
	},
	success: function(res){
		console.log(res);
		$('[name="nim"]').val(res.data.nim);
		$('#nim').text(res.data.nim);

		$('[name="nama"]').val(res.data.nama);
		$('#nama').text(res.data.nama);
		$('#nama_user').prepend(res.data.nama);

		$('[name="jenjang"]').val(res.data.jenjang);
		$('#jenjang').text(res.data.jenjang);

		$('[name="fakultas"]').val(res.data.fakultas);
		$('#fakultas').text(res.data.fakultas);

		$.ajax({
			url:'http://localhost/simas-service/public/api/prodi/fakultas/'+res.data.fakultas,
			type:'get',
			success:function(result){
				for(i in result.data){
					$('[name="prodi"]').append(
						'<option value="'+result.data[i].kode_program_studi+'">'+result.data[i].nama_program_studi+'</option>'
					);
				}
				$('[name="prodi"]').val(res.data.prodi);
				$('#prodi').text(res.data.prodi);
				$('select').material_select();
			},
			error:function(res){
				console.log(res);
			}
		})
		$('[name="tanggal_masuk"]').val(res.data.tanggal_masuk);
		$('#tanggal_masuk').text(res.data.tanggal_masuk);

		$('[name="tanggal_lulus"]').val(res.data.tanggal_lulus);
		$('#tanggal_lulus').text(res.data.tanggal_lulus);

		$('[name="tempat_lahir"]').val(res.data.tempat_lahir);
		$('#tempat_lahir').text(res.data.tempat_lahir);

		$('[name="tanggal_lahir"]').val(res.data.tanggal_lahir);
		$('#tanggal_lahir').text(res.data.tanggal_lahir);

		$('[name="agama"]').val(res.data.agama);
		$('#agama').text(res.data.agama);

		$('[name="alamat"]').val(res.data.alamat);
		$('#alamat').text(res.data.alamat);

		$('[name="provinsi"]').val(res.data.provinsi);
		$('#provinsi').text(res.data.provinsi);

		$.ajax({
			url:'http://localhost/simas-service/public/api/kabkota/provinsi/'+res.data.provinsi,
			type:'get',
			success:function(result){
				for(i in result.data){
					$('[name="kota"]').append(
						'<option value="'+result.data[i].id+'">'+result.data[i].nama+'</option>'
					);
				}
				$('[name="kota"]').val(res.data.kota);
				$('#kota').text(res.data.kota);
				$('select').material_select();
			},
			error:function(res){
				console.log(res);
			}
		})

		$.ajax({
			url:'http://localhost/simas-service/public/api/kecamatan/kabkota/'+res.data.kota,
			type:'get',
			success:function(result){
				for(i in result.data){
					$('[name="kecamatan"]').append(
						'<option value="'+result.data[i].id+'">'+result.data[i].nama+'</option>'
					);
				}
				$('[name="kecamatan"]').val(res.data.kecamatan);
				$('#kecamatan').text(res.data.kecamatan);
				$('select').material_select();
			},
			error:function(res){
				console.log(res);
			}
		})
		$('[name="kelurahan"]').val(res.data.kelurahan);
		$('#kelurahan').text(res.data.kelurahan);

		$('[name="nik"]').val(res.data.nik);
		$('#nik').text(res.data.nik);

		$('[name="jenis_kelamin"]').val(res.data.jenis_kelamin);
		$('#jenis_kelamin').text(res.data.jenis_kelamin);

		$('[name="gol_darah"]').val(res.data.golongan_darah);
		$('#gol_darah').text(res.data.golongan_darah);

		$('[name="kontak"]').val(res.data.kontak);
		$('#kontak').text(res.data.kontak);

		$('[name="email"]').val(res.data.email);
		$('#email').text(res.data.email);

		var kewarganegaraan = res.data.kewarganegaraan.toLowerCase();
		$('#'+kewarganegaraan).attr('checked', true);
		$('#kewarganegaraan').text(res.data.kewarganegaraan);

		var bidik_misi = res.data.bidik_misi.toLowerCase();
		$('#'+bidik_misi).attr('checked',true);
		$('#bidik_misi').text(res.data.bidik_misi);

		$('select').material_select();

	},
	error: function(res){
		console.log(res);
	}
});

//submit form data diri
$('#form_data_diri').submit(function(e){
	e.preventDefault();
	var data= $(this).serialize();

	$.ajax({
		url:'http://localhost/simas-service/public/api/mahasiswa/tambah',
		type:'post',
		data: data,
		beforeSend: function (xhr) {
    		xhr.setRequestHeader('Authorization', 'bearer '+ getCookie('princess'));
		},
		success: function(res){
			console.log(res);
			alert(res.msg);
			window.location.reload();
		},
		error : function(res){
			console.log(res);
		}
	})
})

$('#keluar').click(function(e){
	e.preventDefault();
	document.cookie = "princess=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
	alert("Berhasil Logout");
	window.location.href='login.html';
})