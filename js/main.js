$(document).ready(function() {
    AOS.init({ duration: 800, once: true });

    const itemsPerPage = 6; 
    let currentPage = 1;
    let currentFilter = 'all';

    function initGallery() {
        const allItems = $('.gallery-item');
        
        // Filter Berdasarkan Kategori
        const visibleItems = allItems.filter(function() {
            if (currentFilter === 'all') return true;
            return $(this).attr('data-category') === currentFilter;
        });

        const totalItems = visibleItems.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        // Sembunyikan semua dulu
        allItems.hide();

        // Tampilkan item untuk halaman aktif
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        
        visibleItems.slice(start, end).fadeIn(500);

        renderPagination(totalPages);
    }

    function renderPagination(totalPages) {
        let paginationHtml = '';
        for (let i = 1; i <= totalPages; i++) {
            paginationHtml += `
                <li class="page-item ${i === currentPage ? 'active' : ''}">
                    <a class="page-link" href="javascript:void(0)" onclick="goToPage(${i})">${i}</a>
                </li>`;
        }
        $('#gallery-pagination').html(paginationHtml);
    }

    // Global function untuk dipanggil dari atribut onclick
    window.goToPage = function(page) {
        currentPage = page;
        initGallery();
        $('html, body').animate({
            scrollTop: $("#gallery").offset().top - 100
        }, 100);
    };

    // Event Filter Button
    $('.filter-btn').click(function() {
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');

        currentFilter = $(this).attr('data-filter');
        currentPage = 1; // Reset ke halaman pertama setiap ganti filter
        initGallery();
    });

    // Jalankan pertama kali
    initGallery();

    // Scroll to Top Logic
    $(window).scroll(function() {
        if ($(this).scrollTop() > 400) {
            $('#btn-back-to-top').fadeIn();
        } else {
            $('#btn-back-to-top').fadeOut();
        }
    });

    $('#btn-back-to-top').click(function() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
});