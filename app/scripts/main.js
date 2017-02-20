// var form_email = "m8r-4nb0641@mailinator.com";
var form_email = "david@smartup.io"; // replace this with email where forms should be sent
//=======================================================
// Video Section
//=======================================================
// Cookie policy popup
// http://cookieconsent.wpengine.com/documentation/javascript-api/
window.addEventListener("load", function(){
window.cookieconsent.initialise({
  "palette": {
    "popup": {
      "background": "#fff",
      "text": "#000"
    },
    "button": {
      "background": "#fff"
    }
  },
  "layout": 'smartup-cookie-note',
  "layouts": {
    'smartup-cookie-note': '<div class="smartup-cookie-note">\
      <div class="row-flex"><div class="col-flex">{{header}}<br>{{message}}<br>{{messageFooter}}{{messageFooterLink}}</div>\
      <div class="col-flex">{{compliance}}</div></div></div>',
  },
  "elements": {
    "messageFooter": "To learn more please visit our <a href='/privacy/'>Privacy Policy</a>.",
  },
  "content": {
    "header": "We use cookies on this site to better your user expereince",
    "message": "By clicking any link on this site, you agree to our use of cookies on SmartUp.io",
    "dismiss": "YES, I AGREE"
  }
})});

// GA
// Google analytics outbound links click
var trackOutboundLink = function(url, cat, label, newTab) {
  if(newTab) {
      ga('send', 'event', cat, 'click', label, {'transport': 'beacon'});
      window.open( url, '_blank' );
  } else {
      ga('send', 'event', cat, 'click', label, {
        'transport': 'beacon',
        'hitCallback': function(){document.location = url;}
      });
  }
}

// Google analytics form submission
// Gets a reference to the form element, assuming
// it contains the id attribute "signup-form".
function gaSubmit(elem, cat, label) {
  var form = elem;
  
  // Adds a listener for the "submit" event.
  form.addEventListener('submit', function(event) {
  
    // Prevents the browser from submitting the form
    // and thus unloading the current page.
    event.preventDefault();
  
    // Sends the event to Google Analytics and
    // resubmits the form once the hit is done.
    ga('send', 'event', cat, 'submit', label, {
      hitCallback: function() {
        form.submit();
      }
    });
  });
}

var contactForm = document.getElementById('ContactForm'),
    createCommunityForm = document.getElementById('CreateForm');

if(contactForm) {
  console.log('contact form attempt to send');
  gaSubmit(contactForm, 'Contact', 'ContactForm');
}

if(createCommunityForm) {
  console.log('create form attempt to send');
  gaSubmit(createCommunityForm, 'Create Community', 'CreateForm');
}

$(document).ready(function() {
  
  // Carousel swipe, relies on touchswipe lib
  $(".carousel-inner").swipe({
    //Generic swipe handler for all directions
    swipeLeft: function(event, direction, distance, duration, fingerCount) {
      $(this).parent().carousel('prev');
    },
    swipeRight: function() {
      $(this).parent().carousel('next');
    },
    //Default is 75px, set to 0 for demo so any distance triggers swipe
    threshold: 0
  });

  // Animation during scroll
  new WOW().init();

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
  }
  
  $(document).ready(function() {

    var postToCrm = function(data, cb) {
      if (data.name !== undefined) {
        var name = data.name;
        delete data.name;
        var parts = name.split(' ');

        var lastName = '';
        for (var i = 1; i < parts.length; i++) {
          lastName += parts[i] + " ";
        }

        data.first_name = parts[0];
        data.last_name = lastName;
      }
      _agile.create_contact(data, {
        success: function(data) {
          console.log("Success crm")
          cb.success(data)
        },
        error: function(data) {
          console.error("Failed crm")
          cb.success(data)
        }
      })
    }
    var postToFormSpree = function(data, cb) {
      $.ajax({
        url: "https://formspree.io/" + form_email,
        method: "POST",
        data: data,
        dataType: "json",
        success: function() {
          cb.success()
          console.log("Success")
        },
        error: function() {
          cb.error()
          console.log("Error")
        }
      });
    }

    $("form").submit(function(e) {
      var $form = $(this);
      var $submitButton = $form.find(':button');
      e.preventDefault();
      var buttonLabel = $submitButton.html();
      $submitButton.html('Sending...');
      $submitButton.attr('disabled', 'disabled');

      var $inputs = $(this).find(':input');
      var values = {};
      var errors = false;
      $inputs.each(function() {
        if ($(this).prop('required') && $(this).val() === '') {
          // required do something about it.
          errors = true;
          $(this).parent().addClass('has-error')
        }
        else {
          $(this).parent().removeClass('has-error')
        }
        if (this.name)
          values[this.name] = $(this).val();
      });
      if (errors) {
        return;
      }
      postToCrm(values, {
        success: function(data) {
          postToFormSpree(values, {
            success: function() {
              $submitButton.html(buttonLabel)
              $submitButton.removeAttr('disabled')
              location.href = $form.data('redirect') || '/'
            },
            error: function() {
              $submitButton.html(buttonLabel)
              $submitButton.removeAttr('disabled')
              location.href = $form.data('redirect') || '/'
            }
          });
        },
        error: function(data) {
          $submitButton.html(buttonLabel)
          $submitButton.removeAttr('disabled')
          alert("Error submitting form. Please try again")
        }
      })

    })
  });

});

var k = "♥ ♥ ♥ kems ♥ ♥ ♥ 11:36 pm ♥ ♥ ♥";
