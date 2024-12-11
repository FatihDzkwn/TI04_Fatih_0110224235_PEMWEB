document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('ticketForm');
    const ticketResult = document.getElementById('ticketResult');
    const resultContent = document.getElementById('resultContent');

    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        const inputElement = errorElement.previousElementSibling;
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        inputElement.classList.add('error');   
        inputElement.addEventListener('animationend', function() {
            inputElement.classList.remove('error');
        });
    }

    function hideError(elementId) {
        const errorElement = document.getElementById(elementId);
        const inputElement = errorElement.previousElementSibling;
        errorElement.style.display = 'none';
        inputElement.classList.remove('error');
    }

    function validateName() {
        const nama = document.getElementById('nama').value.trim();
        if (!nama) {
            showError('namaError', 'Nama lengkap harus diisi');
            return false;
        }
        if (nama.length > 30) {
            showError('namaError', 'Nama maksimal 30 karakter');
            return false;
        }
        hideError('namaError');
        return true;
    }

    function validateEmail() {
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            showError('emailError', 'Email harus diisi');
            return false;
        }
        if (!emailRegex.test(email)) {
            showError('emailError', 'Format email tidak valid');
            return false;
        }
        hideError('emailError');
        return true;
    }

    function validateTime() {
        const jam = document.getElementById('jamKeberangkatan').value.trim();
        const timeRegex = /^([01]\d|2[0-3])\.([0-5]\d)$/;
        if (!jam) {
            showError('jamError', 'Jam keberangkatan harus diisi');
            return false;
        }
        if (!timeRegex.test(jam)) {
            showError('jamError', 'Format jam harus HH.MM (00.00 - 23.59)');
            return false;
        }
        hideError('jamError');
        return true;
    }

    function validateDestination() {
        const tujuan = document.getElementById('tujuan').value.trim();
        if (!tujuan) {
            showError('tujuanError', 'Tujuan perjalanan harus diisi');
            return false;
        }
        hideError('tujuanError');
        return true;
    }

    function validateTicketCount() {
        const jumlahTiket = document.getElementById('jumlahTiket').value.trim();
        const tiket = parseInt(jumlahTiket);
        if (!jumlahTiket) {
            showError('jumlahTiketError', 'Jumlah tiket harus diisi');
            return false;
        }
        if (isNaN(tiket) || tiket < 1 || tiket > 10) {
            showError('jumlahTiketError', 'Jumlah tiket harus antara 1-10');
            return false;
        }
        hideError('jumlahTiketError');
        return true;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const isValid = validateName() && validateEmail() && 
                        validateTime() && validateDestination() && 
                        validateTicketCount();

        if (isValid) {
            const nama = document.getElementById('nama').value;
            const email = document.getElementById('email').value;
            const jamKeberangkatan = document.getElementById('jamKeberangkatan').value;
            const tujuan = document.getElementById('tujuan').value;
            const jumlahTiket = document.getElementById('jumlahTiket').value;

            form.style.opacity = '0';
            form.style.transform = 'scale(0.9)';
            form.style.transition = 'all 0.3s ease';

            resultContent.innerHTML = `
                <p><strong>Nama Pelanggan:</strong> ${nama}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Jam Keberangkatan:</strong> ${jamKeberangkatan}</p>
                <p><strong>Tujuan:</strong> ${tujuan}</p>
                <p><strong>Jumlah Tiket:</strong> ${jumlahTiket}</p>
            `;

            setTimeout(() => {
                resultContent.innerHTML = `
                    <p><strong>Nama Pelanggan:</strong> ${nama}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Jam Keberangkatan:</strong> ${jamKeberangkatan}</p>
                    <p><strong>Tujuan:</strong> ${tujuan}</p>
                    <p><strong>Jumlah Tiket:</strong> ${jumlahTiket}</p>
                `;

            ticketResult.style.display = 'block';
            form.reset();
            form.style.opacity = '1';
            form.style.transform = 'scale(1)';
        }, 300);
        }
    });
});
