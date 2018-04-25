$(document).ready(function() {
    $(".delete-description").on("click", function() {
        var id = $(this).data("id");
        var url = "/delete/"+id;

        if(confirm("Удалить описание ?")) {
            $.ajax({
                url: url,
                type: "DELETE",
                success: function(result) {
                    console.log("Удаление описания...");
                    window.location.href = "/";
                },
                error: function(err) {
                    console.log(err);
                }
            });
        };
    });

    $(".edit-description").on("click", function() {
        $("#edit-form-article").val($(this).data("article"));
        $("#edit-form-name").val($(this).data("name"));
        $("#edit-form-description").val($(this).data("description"));
        $("#edit-form-id").val($(this).data("id"));
    });
});