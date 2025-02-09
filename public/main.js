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
    const popupLoadingScreen = document.getElementById('popupLoadingScreen');

    // Set judul, deskripsi, dan link API
    popupTitle.innerText = name;
    popupDescription.innerText = description;
    apiLinkInput.value = `https://claire-api.com/api/${api}`; // Link API otomatis

    // Tampilkan overlay dan loading screen
    overlay.classList.add('active');
    document.body.classList.add('popup-active');
    popupLoadingScreen.classList.add('active'); // Tampilkan loading screen
    resultDiv.style.display = 'none'; // Sembunyikan result sementara

    try {
        const response = await fetch(`/api/${api}`);
        const data = await response.json();
        resultDiv.innerHTML = JSON.stringify(data, null, 2);
    } catch (error) {
        resultDiv.innerHTML = `Error: ${error.message}`;
    } finally {
        // Sembunyikan loading screen dan tampilkan result
        popupLoadingScreen.classList.remove('active');
        resultDiv.style.display = 'block';
    }
}

function closePopup() {
    const overlay = document.getElementById('overlay');
    const popupLoadingScreen = document.getElementById('popupLoadingScreen');
    const resultPopup = document.querySelector('.result-popup');

    // Reset state
    popupLoadingScreen.classList.remove('active'); // Sembunyikan loading screen
    resultPopup.style.opacity = '0';
    resultPopup.style.transform = 'translateY(-20px)';

    setTimeout(() => {
        overlay.classList.remove('active');
        document.body.classList.remove('popup-active');
    }, 300); // Sesuaikan dengan durasi transisi
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
