define([
  'app'
], function(Omnibox){

Omnibox.module('LoginApp.RegLogin', function(RegLogin, Omnibox, Backbone, Marionette, $, _){
  
  RegLogin.LoginView = Marionette.ItemView.extend({
    tagName: 'section',
    className: 'reglogin-container',
    template: '#tpl-login-reglogin',
    events: {
      'click #register': "register",
      'click #login': "login"
    },
    login: function(e) {
        e.preventDefault();
        loginValues = $(e.target).parents('form').serializeArray();
        loginObject = {};
        _.each(loginValues, function(field){
            loginObject[field.name] = field.value;
        });
        dpd.users.login(loginObject, function(user, err) {
            if(err){
                $("#status-messages").html("<p>Login failed, please try again.</p>");
                setTimeout(function(){$("#status-messages").empty()}, 5000);
                return console.log(err);
            }
            dpd.users.me(function(me, err) {
                if(err) return console.log(err);
                Omnibox.currentUser = me;
                if(me.role.length){
                  Omnibox.trigger('loginSuccess');
                  Omnibox.overlayRegion.reset();
                    // See if the device exists already, if not tie it to the user, and set autologin
                    if(typeof device == "undefined"){
                        return;
                    }
                    var query = {"deviceID":device.uuid,"uid":user.uid};
                    dpd.devices.get(query, function (devices) {
                        if(!devices.length){
                            var token = "";
                            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                            for( var i=0; i < 16; i++ ){
                                token += possible.charAt(Math.floor(Math.random() * possible.length));
                            }
                            dpd.devices.post({"deviceID":device.uuid,"currentToken":token,"uid":user.uid}, function(result, err) {
                                if(err) {
                                    return console.log(err);
                                }
                                localStorage.currentToken = token;
                                console.log(result, result.id);
                            });
                        }
                        else{
                            var token = "";
                            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                            for( var i=0; i < 16; i++ ){
                                token += possible.charAt(Math.floor(Math.random() * possible.length));
                            }
                            dpd.devices.put(devices[0].id,{"currentToken":token}, function(result, err) {
                                if(err) {
                                    return console.log(err);

                                }
                                localStorage.currentToken = token;
                                console.log(result, result.id);
                            });

                        }
                        console.log(devices);
                    });
                }
                else{
                    //Omnibox.trigger('showSubscribe');
                    Omnibox.trigger('showSubscriptions');
                }
            })
            // See if the device exists already, if not tie it to the user, and set autologin
            if(typeof device == "undefined"){
                return;
            }
            var query = {"deviceID":device.uuid,"uid":user.uid};
            dpd.devices.get(query, function (devices) {
              if(!devices.length){
                  var token = "";
                  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                  for( var i=0; i < 16; i++ ){
                      token += possible.charAt(Math.floor(Math.random() * possible.length));
                  }
                  dpd.devices.post({"deviceID":device.uuid,"currentToken":token,"uid":user.uid}, function(result, err) {
                      if(err) {
                          return console.log(err);
                      }
                      localStorage.currentToken = token;
                  });
              }
              else{
                  var token = "";
                  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                  for( var i=0; i < 16; i++ ){
                      token += possible.charAt(Math.floor(Math.random() * possible.length));
                  }
                  dpd.devices.put(devices[0].id,{"currentToken":token}, function(result, err) {
                      if(err) {
                          return console.log(err);

                      }
                      localStorage.currentToken = token;
                  });

              }
            });
        });

    },
    register: function(e) {
        e.preventDefault();
        formValid = $(e.target).parents('form').valid();
        if(!formValid){
            return false;
        }
        registerValues = $(e.target).parents('form').serializeArray();
        registerObject = {};
        _.each(registerValues, function(field){
            if(field.name != 'password2'){
              registerObject[field.name] = field.value;
            }
        });
        dpd.users.post(registerObject, function(user, err) {
            if(err) {
                if(err.errors){
                    _.each(err.errors, function(error, key){
                        $("#status-messages").html("<p>" + key + " " + error +"</p>");
                    });
                    setTimeout(function(){$("#status-messages").empty()}, 5000);
                }
                if(err.message){
                    $("#status-messages").html("<p>" + err.message +"</p>");
                    setTimeout(function(){$("#status-messages").empty()}, 5000);
                }
                return console.log(err);
            }
            Omnibox.currentUser = user;
            Omnibox.trigger('showSubscriptions');
        });

    },
    initialize: function() {

    }
  });
  RegLogin.Subscriptions = Marionette.ItemView.extend({
    tagName: 'section',
    className: 'subscribe-container',
    template: '#tpl-show-subscriptions',
    events: {
        'click .next': 'next'
    },
    next: function(e){
        e.preventDefault();
        productObject = {};
        productObject['productID'] = $('input[type=radio]').val();
        componentObject = {};
        _.each($('input[type=checkbox]:checked'), function(component){
            id = $(component).val();
            componentObject[id] = 1;
        });
        Omnibox.trigger('showSubscribe');
    },
    initialize: function() {
      this.collection = new Omnibox.Entities.subscriptionProductsCollection();
      this.collection.fetch({reset:true});
      this.listenTo(this.collection, 'reset', function(){
        myview = this;
        products = this.collection.models;
        _.each(products, function(product, index){
            famID = product.attributes.product.product_family.id
            ajaxURL = 'https://omniboxtv.chargify.com/product_families/' + famID + '/components.json';
            $.ajax({
                type: 'GET',
                url: ajaxURL,
                dataType: 'json',
                beforeSend: function (xhr)
                {
                    xhr.setRequestHeader("Authorization", "Basic "+btoa("cJixpEeADBmDltYDDqDq:x"));
                },
                success: function(data){
                    products[index].attributes.product.components = data;
                    myview.trigger('collectreset');
                }
            });
        });
      });
      this.on('collectreset', this.render);
    }
    
  });
  RegLogin.SubscribeView = Marionette.ItemView.extend({
        tagName: 'section',
        className: 'subscribe-container',
        template: '#tpl-login-subscribe',
        events: {
            'click #subscribe' : 'subscribe'
        },
        subscribe: function(e){
            e.preventDefault();
            formValid = $(e.target).parents('form').valid();
            subscribeValues = $(e.target).parents('form').serializeArray();
            subscribeObject = {};
            _.each(subscribeValues, function(field){
                subscribeObject[field.name] = field.value;
            });
            if(!formValid){
                return false;
            }
            thisTime = Math.round(new Date().getTime() / 1000);
            $.getJSON('https://api.myomnibox.com/v1/chargify-sig.php', {
                "secret" : "aiB9necoay1Miamu",
                "timestamp" : thisTime,
                "data" : "redirect_uri=https%3A%2F%2Fapi.myomnibox.com%2Fv1%2Fchargify-redirect.php"
            }, function(result){console.log(result); window.signature = result
                $.post('https://omniboxtv.chargify.com/api/v2/signups', {
                    "secure": {
                        "api_id": "70c04750-9dc7-0131-b8fa-026566b36527",
                        "timestamp": thisTime ,
                        "data": "redirect_uri=https%3A%2F%2Fapi.myomnibox.com%2Fv1%2Fchargify-redirect.php",
                        "signature": window.signature
                    },
                    "signup": {
                        "product": {
                            //"id": "3395826"
                            "id": productObject['productID']
                        },
                        "customer": {
                            "first_name": subscribeObject['firstName'],
                            "last_name": subscribeObject['lastName'],
                            "email": subscribeObject['email'],
                            "reference": Omnibox.currentUser.id,
                            "address": subscribeObject['address'],
                            "address_2": subscribeObject['address_2'],
                            "city": subscribeObject['city'],
                            "state": subscribeObject['state'],
                            "country": subscribeObject['country'],
                            "zip": subscribeObject['zip']
                        },
                        "payment_profile": {
                            "first_name": subscribeObject['firstName'],
                            "last_name": subscribeObject['lastName'],
                            "card_number": subscribeObject['card_number'],
                            "expiration_month": subscribeObject['expiration_month'],
                            "expiration_year": subscribeObject['expiration_year'],
                            "billing_address": subscribeObject['address'],
                            "billing_address_2": subscribeObject['address_2'],
                            "billing_city": subscribeObject['city'],
                            "billing_state": subscribeObject['state'],
                            "billing_country": subscribeObject['country'],
                            "billing_zip": subscribeObject['zip']
                        },
                        "components": componentObject
                    }
                }, function(result){
                    if(result.result_code == 2000 && result.status_code == 200){
                        $("#status-messages").html("<p>Subscription successful! Enjoy your Omnibox!</p>");
                        setTimeout(function(){$("#status-messages").empty()}, 5000);
                        Omnibox.trigger('loginSuccess');
                        Omnibox.overlayRegion.reset();
                    }
                    else{
                        $("#status-messages").html("<p>There was an error processing your subscription.</p>");
                        setTimeout(function(){$("#status-messages").empty()}, 5000);
                    }
                }, "json");

            });
        },
        initialize: function() {

        }
    });


});


});
