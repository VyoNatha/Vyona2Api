// Simulasikan loading selama 2 detik
setTimeout(() => {
    document.getElementById('loadingScreen').classList.add('hidden');
    document.querySelector('.container').style.opacity = 1;
}, 2000);

const searchInput = document.getElementById('searchInput');
const buttonContainer = document.getElementById('buttonContainer');

// Fungsi untuk memfilter API berdasarkan input pencarian
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    buttonContainer.innerHTML = ''; // Kosongkan container tombol

    apiList.forEach(category => {
        const filteredApis = category.apis.filter(api => api.name.toLowerCase().includes(searchTerm));
        if (filteredApis.length > 0) {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'category';
            categoryDiv.innerHTML = `<h2>${category.category}</h2>`;
            buttonContainer.appendChild(categoryDiv);

            filteredApis.forEach(api => {
                const apiItem = document.createElement('div');
                apiItem.className = 'api-item';
                apiItem.innerHTML = `
                    <div class="api-info">
                        <span>${api.name}</span>
                        <div class="api-description">${api.description}</div>
                    </div>
                    <button onclick="fetchData('${api.endpoint}', '${api.name}', '${api.description}')">Get</button>
                `;
                categoryDiv.appendChild(apiItem);
            });
        }
    });
});

// Generate tombol API saat halaman dimuat
window.onload = () => {
    apiList.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category';
        categoryDiv.innerHTML = `<h2>${category.category}</h2>`;
        buttonContainer.appendChild(categoryDiv);

        category.apis.forEach(api => {
            const apiItem = document.createElement('div');
            apiItem.className = 'api-item';
            apiItem.innerHTML = `
                <div class="api-info">
                    <span>${api.name}</span>
                    <div class="api-description">${api.description}</div>
                </div>
                <button onclick="fetchData('${api.endpoint}', '${api.name}', '${api.description}')">Get</button>
            `;
            categoryDiv.appendChild(apiItem);
        });
    });
};

async function fetchData(api, name, description) {
    const overlay = document.getElementById('overlay');
    const resultDiv = document.getElementById('result');
    const popupTitle = document.getElementById('popupTitle');
    const popupDescription = document.getElementById('popupDescription');
    const apiLinkInput = document.getElementById('apiLink');

    // Set judul, deskripsi, dan link API
    popupTitle.innerText = name;
    popupDescription.innerText = description;
    apiLinkInput.value = `https://claire-api.com/api/${api}`; // Link API otomatis

    try {
        const response = await fetch(`/api/${api}`);
        const data = await response.json();
        resultDiv.innerHTML = JSON.stringify(data, null, 2);
        overlay.classList.add('active');
        document.body.classList.add('popup-active'); // Nonaktifkan scroll
    } catch (error) {
        resultDiv.innerHTML = `Error: ${error.message}`;
        overlay.classList.add('active');
        document.body.classList.add('popup-active'); // Nonaktifkan scroll
    }
}

function closePopup() {
    const overlay = document.getElementById('overlay');
    overlay.classList.remove('active');
    document.body.classList.remove('popup-active'); // Aktifkan scroll kembali
}

function copyResult() {
    const resultText = document.querySelector('#result').innerText;
    navigator.clipboard.writeText(resultText).then(() => {
        const copyButton = document.getElementById('copyButton');
        copyButton.innerText = 'Tersalin!';
        setTimeout(() => {
            copyButton.innerText = 'Salin';
        }, 2000);
    }).catch(err => {
        console.error('Gagal menyalin: ', err);
    });
}