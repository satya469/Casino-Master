<!DOCTYPE html>
<html lang=es>
<head>
    <meta charset="utf-8">
    <meta id="viewport" name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>SiempreGana | Lobby</title>
    <meta name="msapplication-TileColor" content="#2b5797">
    <meta name="theme-color" content="#ffffff">
    
    <link rel="stylesheet" type='text/css' href="https://cdn.siempregana.net/css/bootstrap.min.css">
    
    <link rel="stylesheet" type='text/css' href="https://cdn.siempregana.net/css/mdb.min.css">
    
    <link rel="stylesheet" type='text/css' href="https://cdn.siempregana.net/css/addons/datatables.min.css">
    
    <link rel="stylesheet" type='text/css' href="https://cdn.siempregana.net/css/lightbox-min.css">
    
    <link rel="stylesheet" type='text/css' href="https://cdn.siempregana.net/css/side_menu-min.css">
    
    <link rel="stylesheet" type='text/css' href="https://cdn.siempregana.net/css/index-min.css">
    
    <link rel="stylesheet" type='text/css' href="https://cdn.siempregana.net/mkt/css/10/13/index.css">
    
    <link rel="stylesheet" type='text/css' href="https://cdn.siempregana.net/css/swiper-bundle-min.css">
    
    
    
    <link rel="stylesheet" type='text/css' href="https://use.fontawesome.com/releases/v5.7.0/css/all.css">
    
    <link rel="stylesheet" type='text/css' href="https://fonts.googleapis.com/css?family=Roboto+Condensed">
    
    <link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/npm/roboto-fontface@0.10.0/css/roboto/roboto-fontface.min.css">
    
</head>

    <body class="about-page new-page">
        <header>
            <!-- CONDITION Analytics BEGIN -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-5JWR2JKWJL"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-5JWR2JKWJL');
</script>
<!-- CONDITION Analytics END -->



<!-- CONDITION SitePublic BEGIN -->
<div id="slide-out" class="side-nav fixed d-lg-none">
    <ul class="custom-scrollbar">
        <li class="logo-sn waves-effect pt-1 pb-0">
            <div class="text-center">
                <img id="main-logo" class="d-inline-block align-top mr-1" src="https://cdn.siempregana.net/images/logo_10_13.png" alt="logo">
            </div>
        </li>
        <li>
            <ul id="sidemenu_global_ul" class="collapsible collapsible-accordion">
              
                <li class="side-menu-li-index">
                    <a href="index.php" class="collapsible-header waves-effect side-menu-nav-link nav-link-index">
                        <img src="https://cdn.siempregana.net/images/side_menu/index.png"><span>Lobby</span>
                    </a>
                </li>
              
                <li class="side-menu-li-sports">
                    <a href="sports.php" class="collapsible-header waves-effect side-menu-nav-link nav-link-sports">
                        <img src="https://cdn.siempregana.net/images/side_menu/sports.png"><span>Deportes</span>
                    </a>
                </li>
              
                <li class="side-menu-li-casino">
                    <a href="casino.php" class="collapsible-header waves-effect side-menu-nav-link nav-link-casino">
                        <img src="https://cdn.siempregana.net/images/side_menu/casino.png"><span>Slots</span>
                    </a>
                </li>
              
                <li class="side-menu-li-livecasino">
                    <a href="livecasino.php" class="collapsible-header waves-effect side-menu-nav-link nav-link-livecasino">
                        <img src="https://cdn.siempregana.net/images/side_menu/livecasino.png"><span>Casino Vivo</span>
                    </a>
                </li>
              
                <li class="side-menu-li-horses">
                    <a href="horses.php" class="collapsible-header waves-effect side-menu-nav-link nav-link-horses">
                        <img src="https://cdn.siempregana.net/images/side_menu/horses.png"><span>Caballos</span>
                    </a>
                </li>
              
                <li class="side-menu-li-vsports">
                    <a href="vsports.php" class="collapsible-header waves-effect side-menu-nav-link nav-link-vsports">
                        <img src="https://cdn.siempregana.net/images/side_menu/vsports.png"><span>Virtuales</span>
                    </a>
                </li>
              
                <li class="side-menu-li-poker">
                    <a href="poker.php" class="collapsible-header waves-effect side-menu-nav-link nav-link-poker">
                        <img src="https://cdn.siempregana.net/images/side_menu/poker.png"><span>Poker</span>
                    </a>
                </li>
              
                <li class="side-menu-li-promo_casino">
                    <a href="promo_casino.php" class="collapsible-header waves-effect side-menu-nav-link nav-link-promo_casino">
                        <img src="https://cdn.siempregana.net/images/side_menu/promo_casino.png"><span>Promo Slots</span>
                    </a>
                </li>
              
            </ul>
        </li>
    </ul>
    <img src="" id="sidenav-promo-banner" class="cursor-pointer">
    <div class="sidenav-bg mask-strong"></div>
</div>
<!-- CONDITION SitePublic END -->

<div class="alert alert-warning alert-dismissible font-size-custom show" role="alert" id="ErrorAlert">
    <button type="button" class="close" id="ErrorAlertClose">
        <span aria-hidden="true">&times;</span>
    </button>
    <span class="alert-span"></span>
</div>
<div class="alert alert-success alert-dismissible font-size-custom show" role="alert" id="SuccessAlert">
    <button type="button" class="close" id="SuccessAlertClose">
        <span aria-hidden="true">&times;</span>
    </button>
    <span class="alert-span"></span>
</div>

<nav id="MainNavBar" class="navbar fixed-top navbar-expand-lg scrolling-navbar double-nav py-0 pr-2 px-lg-0 px-xl-3">

    <!-- CONDITION SitePublic BEGIN -->
    <div class="float-left d-lg-none">
        <a href="#" data-activates="slide-out" class="button-collapse"><i class="fas fa-bars"></i></a>
    </div>
    <div class="float-left d-none d-lg-block">
        <img id="main-logo-top" class="d-lg-inline-block align-middle" src="https://cdn.siempregana.net/images/logo_10_13.png" alt="logo">
    </div>
    <!-- CONDITION SitePublic END -->

    
    <div class="float-left d-none d-lg-block">
        <ul class="nav navbar-nav nav-flex-icons navbar-items-top ml-auto">
          
            <li class="nav-item">
                <a href="index.php" class="nav-link waves-effect side-menu-nav-link nav-link-index">Lobby</a>
            </li>
          
            <li class="nav-item">
                <a href="sports.php" class="nav-link waves-effect side-menu-nav-link nav-link-sports">Deportes</a>
            </li>
          
            <li class="nav-item">
                <a href="casino.php" class="nav-link waves-effect side-menu-nav-link nav-link-casino">Slots</a>
            </li>
          
            <li class="nav-item">
                <a href="livecasino.php" class="nav-link waves-effect side-menu-nav-link nav-link-livecasino">Casino Vivo</a>
            </li>
          
            <li class="nav-item">
                <a href="horses.php" class="nav-link waves-effect side-menu-nav-link nav-link-horses">Caballos</a>
            </li>
          
            <li class="nav-item">
                <a href="vsports.php" class="nav-link waves-effect side-menu-nav-link nav-link-vsports">Virtuales</a>
            </li>
          
            <li class="nav-item">
                <a href="poker.php" class="nav-link waves-effect side-menu-nav-link nav-link-poker">Poker</a>
            </li>
          
            <li class="nav-item">
                <a href="promo_casino.php" class="nav-link waves-effect side-menu-nav-link nav-link-promo_casino">Promo Slots</a>
            </li>
          
        </ul>
    </div>

    <div class="breadcrumb-dn mr-auto"></div>
    <ul class="nav navbar-nav nav-flex-icons ml-auto pt-lg-1">

        
        <!-- CONDITION UserGuest BEGIN -->
                <li class="nav-item">
            <a class="nav-link waves-effect" id="TopMenuLogin"><i class="fas fa-sign-in-alt text-white"></i>
                <span class="clearfix">Ingresar</span>
            </a>
        </li>
        <!-- CONDITION UserGuest END -->

    </ul>
</nav>

<!-- CONDITION UserGuest BEGIN -->
<div class="modal fade" id="ModalUserRegister" tabindex="-1" role="dialog" aria-labelledby="UserRegister" aria-modal="true">
    <div class="modal-dialog cascading-modal modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header text-center gradient-card-header red-gradient">
                <h6 class="modal-title w-100 font-weight-bold text-left ml-2">Registrarse</h6>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body white-text">
                <form>
                    <div class="row">
                        <div class="col-xl-5 mx-auto">
                            <div class="md-form pb-2 font-size-custom row">
                                <div class="col-1 mr-4">
                                    <i class="far fa-user prefix lightgrey-text"></i>
                                    </div>
                                <div class="col px-0">
                                    <input type="text" id="RegisterFirstName" class="form-control register-step1-control  modal-clear-val modal-clear-invalid modal-clear-disabled" maxlength="32" autocomplete="off" tabindex="1">
                                    <label for="RegisterFirstName">Nombre</label>
                                </div>
                                <div class="col pl-0">
                                    <input type="text" id="RegisterLastName" class="form-control register-step1-control  modal-clear-val modal-clear-invalid modal-clear-disabled" maxlength="32" autocomplete="off" tabindex="2">
                                    <label for="RegisterLastName">Apellido</label>
                                </div>
                            </div>
                            <div class="md-form pb-2 font-size-custom row">
                                <div class="col-1 mr-4">
                                    <i class="far fa-id-card prefix lightgrey-text"></i>
                                </div>
                                <div class="col pl-0">
                                    <input type="text" id="RegisterPassport" class="form-control register-step1-control  modal-clear-val modal-clear-invalid modal-clear-disabled" maxlength="32" autocomplete="off" tabindex="3">
                                    <label for="RegisterPassport">Documento</label>
                                    <small id="RegisterPassportFormat" class="form-text ml-5 register-format modal-clear-hide">Formato de RUT incorrecto</small>
                                </div>
                            </div>
                            <div class="pb-2">
                                <div class="md-form mt-4 mb-0 font-size-custom d-flex">
                                    <i class="fas fa-mobile-alt prefix lightgrey-text"></i>
                                    <input type="text" id="RegisterPhonePrefix" class="form-control register-step1-control text-right pr-1 modal-clear-val modal-clear-invalid" autocomplete="off" readonly>
                                    <input type="tel" id="RegisterPhone" class="form-control register-step1-control modal-clear-val modal-clear-invalid modal-clear-disabled" maxlength="16" autocomplete="off" required tabindex="4">
                                    <label for="RegisterPhone">Telefono</label>
                                </div>
                                <small id="RegisterPhoneFormat" class="form-text ml-5 register-format modal-clear-hide">Formato de telefono incorrecto</small>
                            </div>
                            <div class="md-form pb-2 font-size-custom">
                                <i class="far fa-envelope prefix lightgrey-text"></i>
                                <input type="email" id="RegisterEmail" class="form-control register-step1-control modal-clear-val modal-clear-invalid modal-clear-disabled" maxlength="64" autocomplete="off" tabindex="5">
                                <label for="RegisterEmail">Email</label>
                                <small id="RegisterEmailFormat" class="form-text ml-5 register-format modal-clear-hide">Formato de email incorrecto</small>
                            </div>
                            <div class="md-form pb-2 font-size-custom">
                                <i class="far fa-flag prefix lightgrey-text"></i>
                                <input type="text" id="RegisterCountry" class="form-control register-step1-control modal-clear-val modal-clear-invalid modal-clear-disabled" maxlength="32" autocomplete="off" tabindex="6">
                                <label for="RegisterCountry">Pais</label>
                            </div>
                            <div class="md-form pb-2 font-size-custom">
                                <i class="far fa-calendar-alt prefix lightgrey-text"></i>
                                <input type="text" id="RegisterBirthday" class="form-control datepicker register-step1-control modal-clear-val modal-clear-invalid modal-clear-disabled" tabindex="7">
                                <label for="RegisterBirthday">Fecha de nacimiento</label>
                            </div>
                            <div class="pl-0 pb-4 form-check font-size-custom modal-clear-show" id="RegisterStep1Terms">
                                <input type="checkbox" id="RegisterTerms" class="form-check-input register-step1-control register-step1-checkbox modal-clear-checked modal-clear-disabled" tabindex="8">
                                <label for="RegisterTerms" class="form-check-label">Acepto los <a href="#" id="RegisterTermsLink1" data-id="tac">terminos y condiciones</a></label>
                                <small id="RegisterTermsFormat" class="form-text ml-5 register-format modal-clear-hide">Debe aceptar los terminos y condiciones</small>
                            </div>
                            <div class="text-center">
                                <button type="button" class="btn btn-danger waves-effect waves-light px-3 modal-clear-button modal-clear-show" id="RegisterStep1Submit" tabindex="9" data-loading-text="<i class='fa fa-spinner fa-spin '></i> Aguarde...">Continuar</button>
                            </div>
                            <div class="col-12 modal-clear-hide font-size-custom text-center" id="RegisterVtokenMessage">Recibira un codigo de verificaccion via <span></span></div>
                            <div class="md-form pb-2 font-size-custom modal-clear-hide" id="RegisterStep2">
                                <i class="fas fa-key prefix lightgrey-text"></i>
                                <input type="tel" id="RegisterVtoken" class="form-control modal-clear-val modal-clear-invalid modal-clear-disabled" maxlength="6" autocomplete="off" tabindex="10">
                                <label for="RegisterVtoken">Codigo de verificacion</label>
                                <small id="RegisterVtokenFormat" class="form-text ml-5 register-format modal-clear-hide">Format de codigo incorrecto</small>
                            </div>
                            <div class="text-center">
                                <button type="button" class="btn btn-danger waves-effect waves-light px-3 modal-clear-hide modal-clear-button disabled" id="RegisterStep2Submit" tabindex="11" data-loading-text="<i class='fa fa-spinner fa-spin '></i> Aguarde...">Continuar</button>
                            </div>
                        </div>
                        <div class="col-xl-5 mx-auto" id="RegisterStep3">
                            <div class="md-form pb-2 font-size-custom">
                                <i class="far fa-user prefix lightgrey-text"></i>
                                <input type="text" id="RegisterUser" class="form-control register-step3-control modal-clear-val modal-clear-invalid" maxlength="16" autocomplete="off" disabled tabindex="12">
                                <label for="RegisterUser">Nombre de usuario</label>
                                <small id="RegisterUserFormat" class="form-text ml-5 register-format modal-clear-hide">Su nombre de usuario debe contener entre 4 y 16 caracteres.</small>
                            </div>
                            <div class="md-form pb-2 font-size-custom">
                                <i class="fas fa-lock prefix lightgrey-text"></i>
                                <input type="password" id="RegisterPasswd1" class="form-control register-step3-control modal-clear-val modal-clear-invalid" maxlength="16" autocomplete="off" disabled tabindex="13">
                                <label for="RegisterPasswd1">Contraseña</label>
                                <small id="RegisterPasswdFormat1" class="form-text ml-5 register-format modal-clear-hide">Su contraseña debe contener entre 6 y 16 caracteres.</small>
                            </div>
                            <div class="md-form pb-2 font-size-custom">
                                <i class="fas fa-lock prefix lightgrey-text"></i>
                                <input type="password" id="RegisterPasswd2" class="form-control register-step3-control modal-clear-val modal-clear-invalid" maxlength="16" autocomplete="off" disabled tabindex="14">
                                <label for="RegisterPasswd2">Repetir Contraseña</label>
                                <small id="RegisterPasswdFormat2" class="form-text ml-5 register-format modal-clear-hide">Las contraseñas no coinciden.</small>
                            </div>
                            <!-- CONDITION UserGuestOnlyPool BEGIN -->
                            <div class="md-form pb-2 font-size-custom" id="ShowRefererField">
                                <i class="fas fa-ticket-alt prefix lightgrey-text"></i>
                                <input type="text" id="RegisterReferer" class="form-control register-step3-control modal-clear-val modal-clear-invalid" maxlength="16" autocomplete="off" disabled tabindex="15">
                                <label for="RegisterReferer">Codigo de Referido</label>
                            </div>
                            <!-- CONDITION UserGuestOnlyPool END -->
                            <div class="text-center">
                                <button type="button" class="btn btn-danger waves-effect waves-light px-3 modal-clear-hide modal-clear-button disabled" id="RegisterStep3Submit" tabindex="17" data-loading-text="<i class='fa fa-spinner fa-spin '></i> Aguarde...">Continuar</button>
                            </div>
                        </div>
                        <div class="col-12 modal-clear-hide font-size-custom text-center" id="UserRegisterError"></div>
                    </div>
                </form>
            </div>
            <div class="modal-footer d-flex justify-content-center py-2">
                <button type="button" class="btn btn-danger px-3 waves-effect waves-light" data-dismiss="modal">Cancelar</button>
            </div>
        </div>
    </div>
</div>


<div class="modal" id="ModalUserLogin" tabindex="-1" role="dialog" aria-labelledby="UserLogin" aria-modal="true">
    <div class="modal-dialog modal-dialog-centered cascading-modal modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-header text-center gradient-card-header red-gradient modal-texture">
                <h6 class="modal-title w-100 font-weight-bold text-left ml-2">Ingreso</h6>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body white-text">
                <form>
                    <div class="md-form pb-2 font-size-custom">
                        <i class="fas fa-user prefix lightgrey-text"></i>
                        <input type="text" id="user" class="form-control login-user-control modal-clear-val" maxlength="16" autocomplete="off">
                        <label for="user">Nombre de usuario</label>
                        <small id="LoginUserFormat" class="form-text ml-5 login-format modal-clear-hide modal-clear-val">Su nombre de usuario debe contener entre 4 y 16 caracteres.</small>
                                            </div>
                    <div class="md-form pb-2 font-size-custom">
                        <i class="fas fa-lock prefix lightgrey-text"></i>
                        <input type="password" id="passwd" class="form-control login-user-control modal-clear-val" maxlength="16" autocomplete="off">
                        <label for="passwd">Contraseña</label>
                        <small id="LoginPasswdFormat" class="form-text ml-5 login-format modal-clear-hide modal-clear-val">Su contraseña debe contener entre 6 y 16 caracteres.</small>
                                            </div>
                    <div class="modal-clear-hide font-size-custom text-center pb-4" id="UserLoginError"></div>
                </form>
            </div>
            <div class="modal-footer d-flex justify-content-center pt-0 pb-2">
                <button type="button" class="btn btn-danger px-3 waves-effect waves-light" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-danger px-3 waves-effect waves-light" id="UserLoginSubmit" data-loading-text="<i class='fa fa-spinner fa-spin '></i> Ingresar">Ingresar</button>
            </div>
                        <div class="col-11 mx-auto font-size-custom2 mt-2 alert alert-secondary p-3 d-none" style="font-size:0.7rem;">El dia miercoles a las 6:00 (GMT-3) el sitio estara en mantenimiento durante 2 horas.</div>
        </div>
    </div>
</div>
<div class="modal fade" id="ModalForgetUserPass" tabindex="-1" role="dialog" aria-labelledby="ForgetUserPass" aria-modal="true">
    <div class="modal-dialog cascading-modal modal-dialog-centered modal-sm" role="document">
        <div class="modal-content">
            <div class="modal-header text-center gradient-card-header red-gradient">
                <h6 class="modal-title w-100 font-weight-bold text-left ml-2" id="ForgetUserPassUsernameTitle">Recuperar usuario</h6>
                <h6 class="modal-title w-100 font-weight-bold text-left ml-2" id="ForgetUserPassPasswordTitle">Recuperar contraseña</h6>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body white-text">
                <form>
                    <div class="md-form mt-4 mb-0 font-size-custom d-flex">
                        <i class="far fa-mobile-alt prefix lightgrey-text"></i>
                        <input type="text" id="ForgetUserPassPhonePrefix" class="form-control forget-userpass-control text-right pr-1 modal-clear-val modal-clear-invalid" autocomplete="off" readonly>
                        <input type="tel" id="ForgetUserPassPhone" class="form-control forget-userpass-control modal-clear-val modal-clear-invalid modal-clear-disabled" maxlength="9" autocomplete="off" required>
                        <label for="ForgetUserPassPhone">Telefono</label>
                    </div>
                    <small id="ForgetUserPassPhoneFormat" class="form-text ml-5 forgetuserpass-format">Formato de telefono incorrecto</small>
                    <div class="md-form mt-4 mb-0 font-size-custom d-flex">
                        <i class="far fa-envelope prefix lightgrey-text"></i>
                        <input type="email" id="ForgetUserPassEmail" class="form-control forget-userpass-control modal-clear-val modal-clear-invalid modal-clear-disabled" maxlength="64" autocomplete="off">
                        <label for="ForgetUserPassEmail">Email</label>
                    </div>
                    <small id="ForgetUserPassEmailFormat" class="form-text ml-5 forgetuserpass-format">{forget_userpass_email_format}</small>
                    <div class="md-form mt-4 mb-0 font-size-custom">
                        <i class="far fa-user prefix lightgrey-text"></i>
                        <input type="tel" id="ForgetUserPassUsername" class="form-control forget-userpass-control modal-clear-val modal-clear-invalid modal-clear-disabled" maxlength="16" autocomplete="off">
                        <label for="ForgetUserPassUsername">Nombre de usuario</label>
                        <small id="ForgetUserPassUsernameFormat" class="form-text ml-5 forgetuserpass-format">Su nombre de usuario debe contener entre 4 y 16 caracteres.</small>
                    </div>
                    <div class="modal-clear-hide font-size-custom text-center pb-4" id="ForgetUserPassError"></div>
                </form>
            </div>
            <div class="modal-footer d-flex justify-content-center py-2">
                <button type="button" class="btn btn-danger px-3 waves-effect waves-light" data-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-danger px-3 waves-effect waves-light modal-clear-disabled" id="ForgetUserPassSubmit" data-loading-text="<i class='fa fa-spinner fa-spin '></i> Enviando...">Enviar</button>
            </div>
        </div>
    </div>
</div>
<!-- CONDITION UserGuest END -->


<div class="modal fade" id="ModalMulti" tabindex="-1" role="dialog" aria-labelledby="ModalMultiContent" aria-modal="true">
    <div class="modal-dialog modal-dialog-scrollable cascading-modal modal-lg modal-dialog-custom" role="document">
        <div class="modal-content">
            <div class="modal-header text-center gradient-card-header red-gradient">
                <h6 class="modal-title w-100 font-weight-bold text-left ml-2">{users_modal_multi_title}</h6>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="col modal-clear-hide text-center text-center mb-4" id="ModalMultiLoading">
                <div class="preloader-wrapper small active">
                    <div class="spinner-layer spinner-green-only">
                        <div class="circle-clipper left"><div class="circle"></div></div>
                        <div class="gap-patch"><div class="circle"></div></div>
                        <div class="circle-clipper right"><div class="circle"></div></div>
                    </div>
                </div>
            </div>
            <div class="modal-body px-2 font-size-custom white-text" id="ModalMultiContent"></div>
            <div class="modal-footer justify-content-center py-2">
                <button type="button" class="btn btn-danger px-3 waves-effect waves-light" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="ModalPromo" tabindex="-1" role="dialog" aria-labelledby="ModalPromoContent" aria-modal="true">
    <div class="modal-dialog modal-dialog-scrollable cascading-modal modal-lg modal-dialog-custom" role="document">
        <div class="modal-content">
            <div class="modal-header text-center gradient-card-header red-gradient">
                <h6 class="modal-title w-100 font-weight-bold text-left ml-2"></h6>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="col modal-clear-hide text-center text-center mb-4" id="ModalPromoLoading">
                <div class="preloader-wrapper small active">
                    <div class="spinner-layer spinner-green-only">
                        <div class="circle-clipper left"><div class="circle"></div></div>
                        <div class="gap-patch"><div class="circle"></div></div>
                        <div class="circle-clipper right"><div class="circle"></div></div>
                    </div>
                </div>
            </div>
            <div class="modal-body px-2 font-size-custom white-text" id="ModalPromoContent"></div>
            <div class="modal-footer justify-content-center py-2">
                <button type="button" class="btn btn-danger px-3 waves-effect waves-light" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>

<div aria-live="polite" aria-atomic="true" id="NotificationsToast"></div>

<div class="card z-depth-2" id="BrowserAdvice">
    <button type="button" class="close" id="BrowserAdviceClose">
        <span aria-hidden="true">&times;</span>
    </button>
    <div class="card-body">
        <h5 class="card-title">Explorador incompatible</h5>
        <p class="card-text">Algunas caracteristicas del sitio no funcionan correctamente con este explorador. Se recomienda utilizar Google Chrome o Mozilla Firefox.</p>
        <p class="card-text card-text-sub">Puede descargarlos desde aqui.</p>
        <div class="d-inline-block px-0">
            <button type="button" class="btn btn-outline-danger btn-md waves-effect waves-light" id="BrowserChrome"><i class="fab fa-chrome"> Chrome</i></button>
        </div>
        <div class="d-inline-block px-0">
            <button type="button" class="btn btn-outline-warning btn-md waves-effect waves-light" id="BrowserFirefox"><i class="fab fa-firefox"> Firefox</i></button>
        </div>
    </div>
</div>

        </header>
        <main>
                      <!-- SECTION HEADER PARALLAX -->
            <!-- CONDITION IndexContent BEGIN -->
            <section id="header-lobby" class="animated-background" data-section="promo_casino">
              <div class="view jarallax" style="height: 37vh;" data-jarallax data-speed="0.6">
                <img id="header-lobby-bg" class="jarallax-img" src="" alt="">
                <div class="mask">
                  <div class="container flex-center text-center">
                    <div class="row mt-5">
                      <div class="col-md-12 col-xl-12 mx-auto wow fadeIn cursor-pointer link-item" data-url="promo_casino.php" data-type="section">
                        <img id="header-logo-game" src="" class="img-fluid wow fadeInDown" data-wow-delay="0.8s">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <!-- CONDITION IndexContent END -->
          <!-- END SECTION HEADER PARALLAX -->


            <!-- CONDITION IndexContent BEGIN -->
            <div class="container px-0 pb-5">
              <div class="col-12 p-0 m-0 row d-flex">

              <!-- CONDITION Modlivecasino BEGIN -->
              <!-- SECTION DOUBLE BANNER -->
<section id="double-lobby" data-section="livecasino" class="double-lobby col-12">
    <div class="section team-section wow fadeIn" data-wow-delay="0.3s">
        <h2 class="text-left mt-5 mb-4 h1 category-title ">Nuestra selección para tí</h2>
    </div>
    <div class="row">
        <div class="col-md-6 mb-4">
            <div class="card collection-card z-depth-4">
                <div class="view zoom cursor-pointer link-item accept-guest" data-url="livecasino.php" data-type="section">
                    <img id="double-rectangle-1" src="" class="img-fluid z-depth-4 rounded">
                    <div class="mask p-3">
                        <p class="title-action">GRAND<br />CASINO ROULETTE</p>
        				<p class="grey-text text-action">En vivo desde los<br />mas grandes Casinos</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6 mb-4">
            <div class="card collection-card z-depth-4">
                <div class="view zoom cursor-pointer link-item accept-guest" data-url="livecasino.php" data-type="section">
                    <img id="double-rectangle-2" src="" class="img-fluid z-depth-4 rounded">
                    <div class="mask p-3">
                        <p class="title-action">BLACKJACK Y<br />BACCARAT</p>
          				<p class="grey-text text-action">Los más completos <br />Juegos de carta</p>
          			</div>
                </div>
            </div>
        </div>
    </div>
</section>
<!-- END SECTION DOUBLE BANNER -->

              <!-- CONDITION Modlivecasino END -->

              <!-- CONDITION Modsports BEGIN -->
              <!-- SECTION SPORTS -->
<section id="sports-lobby" data-section="sports" class="sports-lobby col-12 order-2">
  <div class="section team-section wow fadeIn" data-wow-delay="0.3s">
    <h2 class="text-left mt-5 mb-4 h1 category-title ">Apuestas deportivas</h2>
  </div>
  <div class="row">
    <div class="col-lg-12 col-md-12 mb-12">
      <img src="https://cdn.siempregana.net/mkt/images/es/sports_001.png" class="img-fluid z-depth-3 rounded hoverable cursor-pointer link-item" data-url="sports.php" data-type="section">
    </div>
  </div>
</section>
<!-- END SECTION SPORTS -->

              <!-- CONDITION Modsports END -->

              <!-- CONDITION Modpoker BEGIN -->
              <!-- SECTION POKER -->
<section id="poker-lobby" data-section="poker" class="poker-lobby col-12 order-8">
  <div class="section team-section wow fadeIn" data-wow-delay="0.3s">
    <h3 class="text-left mt-5 mb-4 h1 category-title ">Poker las 24 horas</h3>
  </div>
  <div class="row">
    <div class="col-lg-12 col-md-12 mb-12">
      <img src="https://cdn.siempregana.net/mkt/images/es/poker_001.png" class="img-fluid z-depth-3 rounded hoverable cursor-pointer link-item" data-url="poker.php" data-type="section">
    </div>
  </div>
</section>
<!-- END SECTION POKER -->

              <!-- CONDITION Modpoker END -->

              <!-- CONDITION Modcasino BEGIN -->
              <!-- SECTION CASINO -->
<section id="casino-lobby" data-section="casino" class="casino-lobby col-12 order-3">
  <div class="section team-section wow fadeIn" data-wow-delay="0.3s">
    <h2 class="text-left mt-5 mb-4 h1 category-title">Mas de 2000 Slots</h2>
  </div>
  <section data-section="casino">
    <!-- Swiper -->
    <div class="swiper-container swiper-slot">
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-wrapper">
        <div class="swiper-slide"><img src="https://cdn.siempregana.net/mkt/images/lobby/slot_000.png" class="img-fluid img-fluid z-depth-4 rounded link-item cursor-pointer" data-url="casino.php" data-type="section"></div>
        <div class="swiper-slide"><img src="https://cdn.siempregana.net/mkt/images/lobby/slot_001.png" class="img-fluid img-fluid z-depth-4 rounded link-item cursor-pointer" data-url="casino.php" data-type="section"></div>
        <div class="swiper-slide"><img src="https://cdn.siempregana.net/mkt/images/lobby/slot_002.png" class="img-fluid img-fluid z-depth-4 rounded link-item cursor-pointer" data-url="casino.php" data-type="section"></div>
        <div class="swiper-slide"><img src="https://cdn.siempregana.net/mkt/images/lobby/slot_003.png" class="img-fluid img-fluid z-depth-4 rounded link-item cursor-pointer" data-url="casino.php" data-type="section"></div>
        <div class="swiper-slide"><img src="https://cdn.siempregana.net/mkt/images/lobby/slot_004.png" class="img-fluid img-fluid z-depth-4 rounded link-item cursor-pointer" data-url="casino.php" data-type="section"></div>
        <div class="swiper-slide"><img src="https://cdn.siempregana.net/mkt/images/lobby/slot_005.png" class="img-fluid img-fluid z-depth-4 rounded link-item cursor-pointer" data-url="casino.php" data-type="section"></div>
        <div class="swiper-slide"><img src="https://cdn.siempregana.net/mkt/images/lobby/slot_006.png" class="img-fluid img-fluid z-depth-4 rounded link-item cursor-pointer" data-url="casino.php" data-type="section"></div>
        <div class="swiper-slide"><img src="https://cdn.siempregana.net/mkt/images/lobby/slot_007.png" class="img-fluid img-fluid z-depth-4 rounded link-item cursor-pointer" data-url="casino.php" data-type="section"></div>
        <div class="swiper-slide"><img src="https://cdn.siempregana.net/mkt/images/lobby/slot_008.png" class="img-fluid img-fluid z-depth-4 rounded link-item cursor-pointer" data-url="casino.php" data-type="section"></div>
        <div class="swiper-slide"><img src="https://cdn.siempregana.net/mkt/images/lobby/slot_009.png" class="img-fluid img-fluid z-depth-4 rounded link-item cursor-pointer" data-url="casino.php" data-type="section"></div>
      </div>
    </div>
  </section>
</section>
<!-- END SECTION CASINO -->

              <!-- CONDITION Modcasino END -->

              <!-- CONDITION Modlivecasino BEGIN -->
              <!-- SECTION LIVECASINO -->
<section id="livecasino-lobby" data-section="livecasino" class="livecasino-lobby col-12 order-4">
  <div class="section team-section wow fadeIn" data-wow-delay="0.3s">
    <h3 class="text-left mt-5 mb-4 h1 category-title">Mesas en vivo seleccionadas</h3>
  </div>
  <section>
    <!-- Swiper -->
    <div class="swiper-container swiper-livecasino">
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-wrapper">
        <div class="swiper-slide"><img src="https://cdn.siempregana.net/mkt/images/lobby/livecasino_001.png" class="img-fluid img-fluid z-depth-4 rounded cursor-pointer  link-item" data-url="livecasino.php" data-type="section"></div>
        <div class="swiper-slide"><img src="https://cdn.siempregana.net/mkt/images/lobby/livecasino_002.png" class="img-fluid img-fluid z-depth-4 rounded cursor-pointer  link-item" data-url="livecasino.php" data-type="section"></div>
        <div class="swiper-slide"><img src="https://cdn.siempregana.net/mkt/images/lobby/livecasino_003.png" class="img-fluid img-fluid z-depth-4 rounded cursor-pointer  link-item" data-url="livecasino.php" data-type="section"></div>
        <div class="swiper-slide"><img src="https://cdn.siempregana.net/mkt/images/lobby/livecasino_004.png" class="img-fluid img-fluid z-depth-4 rounded cursor-pointer  link-item" data-url="livecasino.php" data-type="section"></div>
        <div class="swiper-slide"><img src="https://cdn.siempregana.net/mkt/images/lobby/livecasino_005.png" class="img-fluid img-fluid z-depth-4 rounded cursor-pointer  link-item" data-url="livecasino.php" data-type="section"></div>
        <div class="swiper-slide"><img src="https://cdn.siempregana.net/mkt/images/lobby/livecasino_006.png" class="img-fluid img-fluid z-depth-4 rounded cursor-pointer  link-item" data-url="livecasino.php" data-type="section"></div>
        <div class="swiper-slide"><img src="https://cdn.siempregana.net/mkt/images/lobby/livecasino_007.png" class="img-fluid img-fluid z-depth-4 rounded cursor-pointer  link-item" data-url="livecasino.php" data-type="section"></div>
        <div class="swiper-slide"><img src="https://cdn.siempregana.net/mkt/images/lobby/livecasino_008.png" class="img-fluid img-fluid z-depth-4 rounded cursor-pointer  link-item" data-url="livecasino.php" data-type="section"></div>
        <div class="swiper-slide"><img src="https://cdn.siempregana.net/mkt/images/lobby/livecasino_009.png" class="img-fluid img-fluid z-depth-4 rounded cursor-pointer  link-item" data-url="livecasino.php" data-type="section"></div>
        <div class="swiper-slide"><img src="https://cdn.siempregana.net/mkt/images/lobby/livecasino_010.png" class="img-fluid img-fluid z-depth-4 rounded cursor-pointer  link-item" data-url="livecasino.php" data-type="section"></div>
      </div>
    </div>
  </section>
</section>
<!-- END SECTION LIVECASINO -->

              <!-- CONDITION Modlivecasino END -->
              </div>
            </div>
            <!-- CONDITION IndexContent END -->

            <!-- CONDITION SitePublic BEGIN -->
            <div class="modal fade" id="ModalSupportGuest" tabindex="-1" role="dialog" aria-labelledby="ModalSupportGuestContent" aria-modal="true">
                <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered cascading-modal" role="document">
                    <div class="modal-content">
                        <div class="modal-header text-center gradient-card-header red-gradient">
                            <h6 class="modal-title w-100 font-weight-bold text-left ml-2">Mesa de ayuda</h6>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body px-2 white-text" id="ModalSupportGuestContent">
                            <div class="col-12 pt-4 mx-auto text-center">
                                Contactenos a <a href="" id="ModalSupportGuestEmail"></a>
                            </div>
                        </div>
                        <div class="modal-footer justify-content-center">
                            <button type="button" class="btn btn-danger px-3 waves-effect waves-light" data-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- CONDITION SitePublic END -->

        </main>
        <!-- CONDITION IndexContent BEGIN -->
        <!-- CONDITION Footer BEGIN -->
        <footer class="page-footer font-small unique-color-dark">
  <!-- CONDITION FooterSocial BEGIN -->
  <div id="social_links">
    <div class="container">
      <div class="row py-4 d-flex align-items-center">
        <div class="col-md-6 col-lg-5 text-center text-md-left mb-4 mb-md-0">
          <h6 class="mb-0">Seguinos en nuestras redes sociales!</h6>
        </div>
        <div class="col-md-6 col-lg-7 text-center text-md-right">
          <!-- CONDITION SocialLinkfb BEGIN -->
          <a class="fb-ic" href="https://facebook.com/"><i class="fab fa-facebook-f white-text mr-4"> </i></a>
          <!-- CONDITION SocialLinkfb END -->
          <!-- CONDITION SocialLinkig BEGIN -->
          <a class="ig-ic" href="https://instagram.com/"><i class="fab fa-instagram white-text mr-4"> </i></a>
          <!-- CONDITION SocialLinkig END -->
          <!-- CONDITION SocialLinkli BEGIN -->
          <a class="li-ic" href="https://linkedin.com/company/"><i class="fab fa-linkedin-in white-text mr-4"> </i></a>
          <!-- CONDITION SocialLinkli END -->
          <!-- CONDITION SocialLinktw BEGIN -->
          <a class="tw-ic" href="https://twitter.com/"><i class="fab fa-twitter white-text"> </i></a>
          <!-- CONDITION SocialLinktw END -->
        </div>
      </div>
    </div>
  </div>
  <!-- CONDITION FooterSocial END -->
  <div class="container text-center text-md-left pt-4">
    <div class="row mt-3">
      <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
        <h6 class="text-uppercase font-weight-bold"><img src="https://cdn.siempregana.net/images/logo_10_13.png"></h6>
        <hr class="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style="width: 60px;">
        <p>&copy; SiempreGana </p>
      </div>
      
      <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
        <h6 class="text-uppercase font-weight-bold">Productos</h6>
        <hr class="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style="width: 60px;">
        
        <p><a href="sports.php" class="side-menu-nav-link">Deportes</a></p>
        
        <p><a href="casino.php" class="side-menu-nav-link">Slots</a></p>
        
        <p><a href="livecasino.php" class="side-menu-nav-link">Casino Vivo</a></p>
        
        <p><a href="horses.php" class="side-menu-nav-link">Caballos</a></p>
        
        <p><a href="vsports.php" class="side-menu-nav-link">Virtuales</a></p>
        
        <p><a href="poker.php" class="side-menu-nav-link">Poker</a></p>
        
      </div>

      <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
        <h6 class="text-uppercase font-weight-bold">Nosotros</h6>
        <hr class="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style="width: 60px;">
        
        <p><a href="#" id="footer-link-tac" data-id="tac">Terminos y Condiciones</a></p>
        
        <p><a href="#" id="footer-link-privacy" data-id="privacy">Politica de Privacidad</a></p>
        
        <p><a href="#" id="footer-link-responsible" data-id="responsible">Juego Responsable</a></p>
        
      </div>

      <div id="footer_promo" class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4 d-none">
        <h6 class="text-uppercase font-weight-bold">Promociones</h6>
        <hr class="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style="width: 60px;">
      </div>

    </div>
  </div>
  <div class="footer-copyright text-center py-3"><img src="https://cdn.siempregana.net/images/18.svg" width="30px"> <img src="https://cdn.siempregana.net/images/gt-logo.png" width="50" alt="">
    Juega responsablemente. Para mayor información visita:
    <a href="https://www.gamblingtherapy.org/es" target="_new"> GamblingTherapy.org</a>
  </div>
</footer>

        <!-- CONDITION Footer END -->
        <!-- CONDITION ChatSupport BEGIN -->
        <!-- INCLUDE ChatSupport -->
        <!-- CONDITION ChatSupport END -->
        <!-- CONDITION IndexContent END -->
    <script type="text/javascript">
    document.body.dataset.base_server_path='';document.body.dataset.brand_id='13';document.body.dataset.brand_name='SiempreGana';document.body.dataset.brand_support='1';document.body.dataset.cdn_url='https://cdn.siempregana.net/';document.body.dataset.current_language='es';document.body.dataset.is_mobile='';document.body.dataset.recaptcha_public='6LfLV4IaAAAAAGL94uDtQv_hYn_M9qi9EjEl3Ktw';document.body.dataset.passport_type='';document.body.dataset.room_id='10';document.body.dataset.show_results='Resultados';document.body.dataset.modal_promo_results_title='Resultados del torneo';document.body.dataset.site_public='1';document.body.dataset.site_url='play.siempregana.net';document.body.dataset.session_token='3793ee30cf6332049ea832de6555372116e544c10ccf546dcf2a4a791cdd97ce';document.body.dataset.users_notification='Notificacion';document.body.dataset.register_validation='1';document.body.dataset.support_guest='';document.body.dataset.current_section='index';
    </script>
    <script type="text/javascript">
        var own_balance_init = '[]';
    </script>
    
    <script src="https://unpkg.com/autonumeric" ></script>
    
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
    
    <script src="https://unpkg.com/swiper/swiper-bundle.min.js" ></script>
    
    
    <script src="https://cdn.siempregana.net/js/jquery-3.6.0.min.js"></script>
    
    <script src="https://cdn.siempregana.net/js/popper.min.js"></script>
    
    <script src="https://cdn.siempregana.net/js/bootstrap-min.js"></script>
    
    <script src="https://cdn.siempregana.net/js/mdb-min.js"></script>
    
    <script src="https://cdn.siempregana.net/lang/datepicker/es-min.js"></script>
    
    <script src="https://cdn.siempregana.net/js/addons/datatables.min.js"></script>
    
    <script src="https://cdn.siempregana.net/js/lightbox-min.js"></script>
    
    <script src="https://cdn.siempregana.net/js/side_menu-min.js"></script>
    
    <script src="https://cdn.siempregana.net/js/index-min.js"></script>
    
    
    </body>
</html>
