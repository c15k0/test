function calculateDrawDate() {
    let date = $('#date').val();
    let time = $('#time').val();
    let $result = $('#draw-result');
    $result.html('-');
    $.ajax({
        url: '004/getDrawDate.php',
        data: {
            date: date,
            time: time
        },
        method: "GET"
    }).done((result) => {
        $result.html(result);
    });
}

(function() {
    $('#datepicker').datetimepicker({
        locale: 'es',
        format: 'L'
    });
    $('#timepicker').datetimepicker({
        locale: 'es',
        format: 'LT'
    });
})();