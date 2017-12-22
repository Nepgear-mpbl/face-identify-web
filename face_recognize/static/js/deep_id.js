layui.use('form', function () {
    var form = layui.form;

    $('#img-input1').change(function () {
        var file = this.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#preview-img1').attr("src", e.target.result).removeClass("layui-hide");
        };
        reader.readAsDataURL(file);
    });
    $('#img-input2').change(function () {
        var file = this.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#preview-img2').attr("src", e.target.result).removeClass("layui-hide");
        };
        reader.readAsDataURL(file);
    });
    form.on('submit(img-upload-btn)', function () {
        var formData = new FormData(document.getElementById("img-upload-form"));
        console.log(formData);
        $.ajax({
            url: '/deepid/validate',
            type: 'POST',
            beforeSend: function () {
                layer.load();
            },
            success: function (retJson) {
                var ret = JSON.parse(retJson);
                layer.closeAll('loading');
                console.log(ret);
                layer.msg(ret.result.toString());
            },
            error: function (retJson) {
                layer.closeAll('loading');
                layer.msg('error');
            },
            data: formData,
            cache: false,
            contentType: false,
            processData: false
        });
        return false;
    });
});