// var form_email = "m8r-4nb0641@mailinator.com";
var form_email = "franck@smartup.io"; // replace this with email where forms should be sent
//=======================================================
// Video Section
//=======================================================
$(document).ready(function() {

    // Animation druing scroll
    new WOW().init();
    // window.sr = ScrollReveal();
    // sr.reveal('.reveal', {
    //     duration: 700
    // });

    var vid1 = document.getElementById("myVideo1");
    if (vid1) {
        function playPause1() {
            if (vid1.paused) {
                vid1.play();
            }
            else {
                vid1.pause();
            }
        }
        if ($("#videoWrap1").length > 0) {
            $('#playVideos').on('click', function(e) {
                e.preventDefault();
                playPause1();
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                    vid1.pause();
                }
                else {
                    $(this).addClass('active');
                    vid1.play();
                }
            });
        }
        vid1.play();

        // $('.play-btn').on('click', function(e) {
        //     e.preventDefault();
        //     vid1.play();
        // });

    }
    $(document).ready(function() {
      var postToFormSpree = function(data, cb) {
        $.ajax({
          url: "https://formspree.io/" + form_email,
          method: "POST",
          data: data,
          dataType: "json",
          success: function(){
            cb.success()
            console.log("Success")
          },
          error: function() {
            cb.error()
            console.log("Error")
          }
        });
      }

      $("form").submit(function(e){
        var $form = $(this);
        var $submitButton = $form.find(':button');
        e.preventDefault();
        var buttonLabel = $submitButton.html();
        $submitButton.html('Sending...');
        $submitButton.attr('disabled', 'disabled');

        var $inputs = $(this).find(':input');
        var values = {};
        var errors = false;
        $inputs.each(function(){
          if($(this).prop('required') && $(this).val() === '') {
            // required do something about it.
            errors = true;
            $(this).parent().addClass('has-error')
          } else {
            $(this).parent().removeClass('has-error')
          }
          if(this.name)
            values[this.name] = $(this).val();
        });
        if (errors) {
          return;
        }

        postToFormSpree(values, {
          success: function() {
            $submitButton.html(buttonLabel)
            $submitButton.removeAttr('disabled')
            location.href = $form.data('redirect') || '/'
          },
          error: function() {
            $submitButton.html(buttonLabel)
            $submitButton.removeAttr('disabled')
            alert("Error submitting form. Please try again")
          }
        });
      })
    });

});
