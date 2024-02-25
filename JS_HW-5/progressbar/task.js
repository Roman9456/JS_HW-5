const form = document.getElementById('form');
const progressBar = document.getElementById('progress');

form.addEventListener('submit', e => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('file', form.file.files[0]);

  const xhr = new XMLHttpRequest();


  xhr.addEventListener('loadstart', () => {
    progressBar.value = 0;
  });

  xhr.upload.addEventListener('progress', e => {
    if (e.lengthComputable) {
      const progress = (e.loaded / e.total) * 100;
      progressBar.value = progress;
    }
  });

  xhr.addEventListener('loadend', () => {
    progressBar.value = 100;
  });

  xhr.addEventListener('load', e => {
    if (xhr.status === 200) {
      console.log('Файл успешно загружен');
    } else {
      console.error('Ошибка при загрузке файла');
    }
  });

  xhr.addEventListener('error', e => {
    console.error('Произошла ошибка при отправке запроса');
  });

  xhr.open(form.method, form.action);
  xhr.send(formData);
});
