(function() {
    $('#carousel').carousel({
        pause: true,
        interval: false
    });
    $('#carousel').on('slid.bs.carousel', (ev) => {
        let id = $(ev.target).find('img').attr('id');
        $.ajax({
            dataType: 'json',
            data: {
                ts: (new Date()).getTime(),
                id: id
            },
            method: "POST",
            url: "http://localhost:8889/track.php?_i=" + id
        }).done(() => {
            console.log('Tracked!!');
        });
    });
})(window);