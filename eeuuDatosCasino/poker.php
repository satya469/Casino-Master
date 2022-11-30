<!DOCTYPE html>
<html lang=es>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>SiempreGana | Poker</title>
    <meta name="msapplication-TileColor" content="#2b5797">
    <meta name="theme-color" content="#ffffff">
    
    <link rel="stylesheet" type='text/css' href="https://cdn.siempregana.net/css/bootstrap.min.css">
    
    <link rel="stylesheet" type='text/css' href="https://cdn.siempregana.net/css/mdb.min.css">
    
    <link rel="stylesheet" type='text/css' href="https://cdn.siempregana.net/css/addons/datatables.min.css">
    
    <link rel="stylesheet" type='text/css' href="https://cdn.siempregana.net/css/lightbox-min.css">
    
    <link rel="stylesheet" type='text/css' href="https://cdn.siempregana.net/css/side_menu-min.css">
    
    <link rel="stylesheet" type='text/css' href="https://cdn.siempregana.net/css/poker-min.css">
    
    <link rel="stylesheet" type='text/css' href="https://cdn.siempregana.net/mkt/css/10/13/poker.css">
    
    
    
    <link rel="stylesheet" type='text/css' href="https://use.fontawesome.com/releases/v5.7.0/css/all.css">
    
    <link rel="stylesheet" type='text/css' href="https://fonts.googleapis.com/css?family=Roboto+Condensed">
    
    <link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/npm/roboto-fontface@0.10.0/css/roboto/roboto-fontface.min.css">
    
</head>
<body class="fixed-sn white-skin">
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
    <main id="main">
        <div class="col-12 px-0 py-0 justify-content-center" id="current_container">
            <object id="game_object" type="text/html" data=""></object>
        </div>
        <div class="col-12 px-0 text-center mb-4" id="banner_container"></div>
        <div id="main_container" class="mt-4">
            <div class="col-12 pb-3 text-center ebg-btn-div">
                <button class="btn btn-danger pkr-client-btn-unique create-nickname-btn" id="create_nickname">Crear usuario</button>
            </div>
            <div class="col-11 col-xl-10 mx-auto pkr-client-bg">
                <div class="row">
                    <div class="col-12 col-lg-4 mx-lg-auto py-4 order-1 order-lg-2">
                        <div class="pkr-client-device-title mb-3 my-lg-4 d-none d-lg-none">Web</div>
                        <div class="pkr-client-device-image my-3"><img src="https://cdn.siempregana.net/images/pkr_html5.png"></div>
                        <div class="pkr-client-device-text my-2 my-lg-4">Pruebe la versión HTML5 sin descargas usando su computadora o móvil.</div>
                        <div class="pkr-client-device-buttons mt-lg-4">
                            <a rel="nofollow" class="btn btn-danger pkr-client-btn pkr-client-btn-unique" id="load_game">Online</a>
                        </div>
                    </div>
                    <div class="col-12 col-lg-4 mx-lg-auto py-4 order-2 order-lg-1">
                        <div class="pkr-client-device-title mb-2 my-lg-4 d-none d-lg-none">Movil</div>
                        <div class="pkr-client-device-image my-3"><img src="https://cdn.siempregana.net/images/pkr_mobile.png"></div>
                        <div class="pkr-client-device-text my-2 my-lg-4">Descargue la versión para dispositivos móviles Android o para iOS.</div>
                        <div class="pkr-client-device-buttons mt-lg-4">
                            <a rel="nofollow" class="btn btn-danger pkr-client-btn pkr-client-btn-left" href="https://files.latpoker.net/downloads/Latpoker/android/Latpoker.apk">Android</a>
                            <a rel="nofollow" class="btn btn-danger pkr-client-btn pkr-client-btn-right" href="https://apps.apple.com/us/app/latpoker/id1199900090">iOS</a>
                        </div>
                    </div>
                    <div class="col-12 col-lg-4 mx-lg-auto py-4 order-3">
                        <div class="pkr-client-device-title mb-2 my-lg-4 d-none d-lg-none">Escritorio</div>
                        <div class="pkr-client-device-image my-3"><img src="https://cdn.siempregana.net/images/pkr_desktop.png"></div>
                        <div class="pkr-client-device-text my-2 my-lg-4">Descargue la versión de escritorio para Windows o para macOS.</div>
                        <div class="pkr-client-device-buttons mt-lg-4">
                            <a rel="nofollow" class="btn btn-danger pkr-client-btn pkr-client-btn-left" href="https://files.latpoker.net/downloads/Latpoker/win/LatpokerSetup.exe">Windows</a>
                            <a rel="nofollow" class="btn btn-danger pkr-client-btn pkr-client-btn-right" href="https://files.latpoker.net/downloads/Latpoker/mac/LatpokerSetup.dmg">MacOS</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-10 mx-auto pkr-client-bg d-none">
                <div class="row">
                    <div class="col-12 mx-lg-auto py-4 order-1 order-lg-2">
                        <div class="pkr-client-device-text my-2 my-lg-4">El sistema de Poker se encuentra en mantanimiento por inconvenientes tecnicos<br><br>The Poker system is under maintenance due to technical problems</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="ModalCreateNickname" tabindex="-1" role="dialog" aria-labelledby="CreateNickname" aria-modal="true">
            <div class="modal-dialog cascading-modal modal-dialog-centered modal-sm" role="document">
                <div class="modal-content">
                    <div class="modal-header text-center gradient-card-header red-gradient">
                        <h6 class="modal-title w-100 font-weight-bold text-left ml-2">Crear Usuario</h6>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body white-text">
                        <div class="font-size-custom modal-clear-hide py-2 text-center" id="CreateNicknameError">
                            El nombre de usuario ya se encuentra en uso.<br><br>
                        </div>
                        <div class="md-form pb-2 font-size-custom">
                            <i class="fas fa-user prefix lightgrey-text"></i>
                            <input type="text" id="create_new_nickname" class="form-control modal-clear-val white-text" maxlength="16">
                            <label for="create_new_nickname">Nombre de usuario</label>
                        </div>
                    </div>
                    <div class="modal-footer d-flex justify-content-center py-2">
                        <button type="button" class="btn btn-danger px-3 waves-effect waves-light create-nickname-btn" id="ModalCreateNicknameSubmit">Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <div class="modal fade" id="ModalPokerCurrency" tabindex="-1" role="dialog" aria-labelledby="PokerCurrency" aria-modal="true">
        <div class="modal-dialog modal-dialog-centered cascading-modal modal-md" role="document">
            <div class="modal-content">
                <div class="modal-header text-center gradient-card-header red-gradient">
                    <h6 class="modal-title w-100 font-weight-bold text-left ml-2">Informacion</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body px-4 py-5 white-text">Debido a un inconveniente técnico, los valores son mostrados en la moneda original. Esto solo afecta la visulización, y será solucionado a la brevedad.</div>
                <div class="modal-footer justify-content-center py-2">
                    <button type="button" class="btn btn-danger px-3 waves-effect waves-light" id="ModalPokerCurrencyClose" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript">
    document.body.dataset.base_server_path='';document.body.dataset.brand_id='13';document.body.dataset.brand_name='SiempreGana';document.body.dataset.brand_support='1';document.body.dataset.cdn_url='https://cdn.siempregana.net/';document.body.dataset.current_language='es';document.body.dataset.is_mobile='';document.body.dataset.recaptcha_public='6LfLV4IaAAAAAGL94uDtQv_hYn_M9qi9EjEl3Ktw';document.body.dataset.passport_type='';document.body.dataset.room_id='10';document.body.dataset.show_results='Resultados';document.body.dataset.modal_promo_results_title='Resultados del torneo';document.body.dataset.site_public='1';document.body.dataset.site_url='play.siempregana.net';document.body.dataset.session_token='5743350a568bbdc2252b85984cf2049ab64c5ec6860477c976025a942376b1d1';document.body.dataset.users_notification='Notificacion';document.body.dataset.register_validation='1';document.body.dataset.support_guest='';document.body.dataset.current_section='poker';
    </script>
    <script type="text/javascript">
    var own_balance_init = '[]';
    </script>
    
    <script src="https://unpkg.com/autonumeric" ></script>
    
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
    
    
    <script src="https://cdn.siempregana.net/js/jquery-3.6.0.min.js"></script>
    
    <script src="https://cdn.siempregana.net/js/popper.min.js"></script>
    
    <script src="https://cdn.siempregana.net/js/bootstrap-min.js"></script>
    
    <script src="https://cdn.siempregana.net/js/mdb-min.js"></script>
    
    <script src="https://cdn.siempregana.net/lang/datepicker/es-min.js"></script>
    
    <script src="https://cdn.siempregana.net/js/addons/datatables.min.js"></script>
    
    <script src="https://cdn.siempregana.net/js/lightbox-min.js"></script>
    
    <script src="https://cdn.siempregana.net/js/side_menu-min.js"></script>
    
    <script src="https://cdn.siempregana.net/js/poker-min.js"></script>
    
    
</body>
</html>