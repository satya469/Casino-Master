<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta id="viewport" name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>SiempreGana</title>
    <meta name="msapplication-TileColor" content="#2b5797">
    <meta name="theme-color" content="#ffffff">
    
    <link rel="stylesheet" type='text/css' href="https://cdn.admin.siempregana.net/css/bootstrap.min.css">
    
    <link rel="stylesheet" type='text/css' href="https://cdn.admin.siempregana.net/css/mdb.min.css">
    
    <link rel="stylesheet" type='text/css' href="https://cdn.admin.siempregana.net/css/addons/datatables.min.css">
    
    <link rel="stylesheet" type='text/css' href="https://cdn.admin.siempregana.net/css/lightbox-min.css">
    
    <link rel="stylesheet" type='text/css' href="https://cdn.admin.siempregana.net/css/jstree-min.css">
    
    <link rel="stylesheet" type='text/css' href="https://cdn.admin.siempregana.net/css/side_menu-min.css">
    
    <link rel="stylesheet" type='text/css' href="https://cdn.admin.siempregana.net/css/report_provider210-min.css">
    
    
        
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css">
        
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/roboto-fontface@0.10.0/css/roboto/roboto-fontface.min.css">
        
</head>
<body class="fixed-sn white-skin">
  <div class="alert alert-warning alert-dismissible show" role="alert" id="ErrorAlert">
    <button type="button" class="close" id="ErrorAlertClose">
      <span aria-hidden="true">&times;</span>
    </button>
    <i class="fa fa-info mx-2"></i>
    <span class="alert-span"></span>
  </div>
  <header>
    <!-- CONDITION Analytics BEGIN -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-STKV4JMKMJ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-STKV4JMKMJ');
</script>
<!-- CONDITION Analytics END -->
<div id="slide-out" class="side-nav fixed wide">
    <ul class="custom-scrollbar">
        <li class="logo-sn waves-effect py-3">
            <div class="text-center">
                <img id="main-logo" class="d-inline-block align-top mr-1" src="https://cdn.admin.siempregana.net/images/logo_10_13.png" alt="logo">
            </div>
        </li>
        <li>
            <ul id="sidemenu_global_ul" class="collapsible collapsible-accordion">
                <!-- CONDITION Dashboard BEGIN -->
                <li><a href="dashboard.php" class="collapsible-header waves-effect"><i class="fas fa-chart-pie"></i>Estadisticas<i class="fas fa-angle-right"></i></a></li>
                <!-- CONDITION Dashboard END -->
                <!-- CONDITION UsersOperation BEGIN -->
                <li>
                    <a href="users.php" class="collapsible-header waves-effect">
                        <i class="fas fa-user-cog"></i>Usuarios<i class="fas fa-angle-right"></i>
                    </a>
                </li>
                <!-- CONDITION UsersOperation END -->
                <!-- CONDITION Global BEGIN -->
                <li>
                    <a class="collapsible-header collapsible-header-custom waves-effect arrow-r">
                        <i class="fas fa-brain"></i>Reportes Globales<i class="fas fa-angle-down rotate-icon"></i>
                    </a>
                    <div class="collapsible-body">
                        <ul>
                            <!-- CONDITION ReportGlobal BEGIN -->
                            <li>
                                <a href="report_global.php" class="waves-effect">
                                    Reporte por Agente<i class="fas fa-angle-right"></i>
                                </a>
                            </li>
                            <!-- CONDITION ReportGlobal END -->
                            <!-- CONDITION ReportGlobalPlayer BEGIN -->
                            <li>
                                <a href="report_global_player.php" class="waves-effect">
                                    Reporte por Jugador<i class="fas fa-angle-right"></i>
                                </a>
                            </li>
                            <!-- CONDITION ReportGlobalPlayer END -->
                        </ul>
                    </div>
                </li>
                <!-- CONDITION Global END -->
                <!-- CONDITION Balances BEGIN -->                
                <li>
                    <a class="collapsible-header collapsible-header-custom waves-effect arrow-r">
                        <i class="fas fa-coins"></i>Reportes de Fichas<i class="fas fa-angle-down rotate-icon"></i>
                    </a>
                    <div class="collapsible-body">
                        <ul>
                            <!-- CONDITION ReportBalances BEGIN -->
                            <li>
                                <a href="report_balances.php" class="waves-effect">
                                    Cargas y Retiros<i class="fas fa-angle-right"></i>
                                </a>
                            </li>
                            <!-- CONDITION ReportBalances END -->
                            <!-- CONDITION ReportPlayerHistory BEGIN -->
                            <li>
                                <a href="report_player_history.php" class="waves-effect">
                                    Historial del Jugador<i class="fas fa-angle-right"></i>
                                </a>
                            </li>
                            <!-- CONDITION ReportPlayerHistory END -->
                        </ul>
                    </div>
                <!-- CONDITION Balances END -->                

                </li>
                            <!-- CONDITION ReportProviders BEGIN -->

                <li>
                    <a class="collapsible-header collapsible-header-custom waves-effect arrow-r">
                        <i class="fas fa-dice"></i>Reportes de Juegos<i class="fas fa-angle-down rotate-icon"></i>
                    </a>
                    <div class="collapsible-body">
                        <ul>
                            <!-- CONDITION ReportProvider210 BEGIN -->
                            <li>
                                <a href="report_provider210.php" class="waves-effect">
                                    Deportes<i class="fas fa-angle-right"></i>
                                </a>
                            </li>
                            <!-- CONDITION ReportProvider210 END -->
                            <!-- CONDITION ReportProvider300 BEGIN -->
                            <li>
                                <a href="report_provider300.php" class="waves-effect">
                                    Casino<i class="fas fa-angle-right"></i>
                                </a>
                            </li>
                            <!-- CONDITION ReportProvider300 END -->
                            <!-- CONDITION ReportProvider120 BEGIN -->
                            <li>
                                <a href="report_provider120.php" class="waves-effect">
                                    Poker<i class="fas fa-angle-right"></i>
                                </a>
                            </li>
                            <!-- CONDITION ReportProvider120 END -->
                        </ul>
                    </div>
                </li>
                                            <!-- CONDITION ReportProviders END -->

                <!-- CONDITION Finance BEGIN -->
                <li>
                    <a class="collapsible-header collapsible-header-custom waves-effect arrow-r">
                        <i class="fas fa-donate"></i>Finanzas<i class="fas fa-angle-down rotate-icon"></i>
                    </a>
                    <div class="collapsible-body">
                        <ul class="collapsible collapsible-accordion mt-0">
                            <!-- CONDITION FinanceAffiliates BEGIN -->

                            <li>
                                <a class="collapsible-header collapsible-header-custom waves-effect arrow-r collapsible-level-2">
                                    <i class="fas fa-user-secret"></i>Agentes<i class="fas fa-angle-down rotate-icon"></i></a>
                                <div class="collapsible-body">
                                    <ul>
                                        <!-- CONDITION FinanceAffiliatesOperation BEGIN -->
                                        <li>
                                            <a href="finance_affiliates_operation.php" class="waves-effect">
                                                Operaciones<i class="fas fa-angle-right"></i>
                                            </a>
                                        </li>
                                        <!-- CONDITION FinanceAffiliatesOperation END -->
                                        <!-- CONDITION FinanceAffiliatesBalances BEGIN -->
                                        <li>
                                            <a href="finance_affiliates_balances.php" class="waves-effect">
                                                Cuentas Corrientes<i class="fas fa-angle-right"></i>
                                            </a>
                                        </li>
                                        <!-- CONDITION FinanceAffiliatesBalances END -->
                                    </ul>
                                </div>
                            </li>              
                            <!-- CONDITION FinanceAffiliates END -->
                            <!-- CONDITION FinancePlayers BEGIN -->
                            <li>
                                <a class="collapsible-header collapsible-header-custom waves-effect arrow-r collapsible-level-2">
                                    <i class="fas fa-users"></i> Jugadores<i class="fas fa-angle-down rotate-icon"></i>
                                </a>
                                <div class="collapsible-body">
                                    <ul>
                                        <!-- CONDITION FinancePlayersOperation BEGIN -->
                                        <li>
                                            <a href="finance_players_operation.php" class="waves-effect">
                                                Operaciones<i class="fas fa-angle-right"></i>
                                            </a>
                                        </li>
                                        <!-- CONDITION FinancePlayersOperation END -->
                                        <!-- CONDITION FinancePlayersBalances BEGIN -->
                                        <li>
                                            <a href="finance_players_balances.php" class="waves-effect">
                                                Cuentas Corrientes<i class="fas fa-angle-right"></i>
                                            </a>
                                        </li>
                                        <!-- CONDITION FinancePlayersBalances END -->
                                    </ul>
                                </div>
                            </li>              
                            <!-- CONDITION FinancePlayers END -->

                        </ul>
                    </div>
                </li>
                <!-- CONDITION Finance END -->

                <!-- CONDITION FinanceAffiliatesOwnBalance BEGIN -->
                <li>
                    <a href="finance_affiliates_own_balance.php" class="collapsible-header waves-effect">
                        <i class="fas fa-file-invoice-dollar"></i>Mi resumen<i class="fas fa-angle-right"></i>
                    </a>
                </li>
                <!-- CONDITION FinanceAffiliatesOwnBalance END -->
                                                
                <li>
                    <a id="toggle" class="collapsible-header waves-effect">
                        <i class="fas fa-angle-double-left"></i>Plegar Menu
                    </a>
                </li>

            </ul>
        </li>
    </ul>
    <div class="sidenav-bg mask-strong"></div>
</div>
<nav class="navbar fixed-top navbar-expand-lg scrolling-navbar double-nav">
    <div class="float-left">
        <a href="#" data-activates="slide-out" class="button-collapse black-text">
            <i class="fas fa-bars"></i>
        </a>
    </div>
    <div class="breadcrumb-dn mr-auto"></div>
        <ul class="nav nav-custom navbar-nav nav-flex-icons ml-auto">
            <li class="nav-item">
                <a class="nav-link waves-effect"><i class="fas fa-coins"></i> <span class="clearfix d-none d-sm-inline-block own-balance"></span></a>
            </li>
            <!-- CONDITION BrandSupport BEGIN -->
            <li class="nav-item dropdown notifications-nav support-nav user-custom-dropdown">
                <a class="nav-link dropdown-toggle waves-effect" id="navbarSupportMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="badge red" id="SupportCount"></span> <i class="support-icon support-icon-top"></i>
                </a>
                <div class="dropdown-menu dropdown-primary user-support-dropdown" aria-labelledby="navbarSupportMenuLink"></div>
            </li>
            <!-- CONDITION BrandSupport END -->
            <li class="nav-item dropdown notifications-nav user-custom-dropdown">
                <a class="nav-link dropdown-toggle waves-effect" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span class="badge red" id="NotificationsCount"></span> <i class="fas fa-bell"></i>
                </a>
                <div class="dropdown-menu dropdown-primary user-notifications-dropdown" aria-labelledby="navbarDropdownMenuLink"></div>
            </li>
            <li class="nav-item dropdown user-custom-dropdown">
                <a class="nav-link dropdown-toggle waves-effect" href="#" id="userDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-user-secret"></i> <span class="clearfix d-none d-sm-inline-block own-username">Pastblind1</span>
                </a>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                    <!-- CONDITION ChangeOwnPassword BEGIN -->
                    <a class="dropdown-item" href="#" id="ChangeOwnPassword" data-user-id="26270">Cambiar Contraseña</a>
                    <!-- CONDITION ChangeOwnPassword END -->

                    <a class="dropdown-item" href="#" id="ChangeLanguage">Cambiar Idioma</a>
                    <a class="dropdown-item" href="#" id="LoginHistory">Historial de Ingresos</a>
                    <!-- CONDITION SupportMyAccount BEGIN -->
                    <!-- CONDITION BrandRegister BEGIN -->
                    <a class="dropdown-item" href="#" id="MyAccount">Mi cuenta</a>
                    <!-- CONDITION BrandRegister END -->
                    <!-- CONDITION SupportMyAccount END -->
                    <a class="dropdown-item" href="login.php">Salir</a>
                </div>
            </li>
        </ul>
    </nav>
    <div class="modal fade" id="ModalChangePassword" tabindex="-1" role="dialog" aria-labelledby="ChangePassword" aria-modal="true">
        <div class="modal-dialog cascading-modal modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-header text-center gradient-card-header blue-gradient">
                    <h6 class="modal-title w-100 font-weight-bold text-left ml-2">Cambiar Contraseña</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="font-size-custom modal-clear-hide py-2" id="ChangePasswdForce">Para preversar la seguridad de su cuenta, le aconsejamos cambiar su contraseña.</div>
                    <div class="md-form pb-2 font-size-custom">
                        <i class="fas fa-eye prefix change-password-reveal grey-text" title="{users_modal_change_password_reveal}"></i>
                        <input type="text" id="ChangePasswordNew1" class="form-control change-password-toggle change-password-input modal-clear-val" maxlength="16">
                        <label for="ChangePasswordNew1">Nueva Contraseña</label>
                        <small id="ChangePasswordFormat1" class="form-text modal-clear-hide text-muted">La contraseña debe contener entre 6 y 16 caracteres.</small>
                    </div>
                    <div class="md-form pb-2 font-size-custom">
                        <i class="fas fa-eye prefix change-password-reveal grey-text" title="{users_modal_change_password_reveal}"></i>
                        <input type="text" id="ChangePasswordNew2" class="form-control change-password-toggle change-password-input modal-clear-val" maxlength="16">
                        <label for="ChangePasswordNew2">Ingrese Nuevamente</label>
                        <small id="ChangePasswordFormat2" class="form-text modal-clear-hide text-muted">Las contraseñas no coinciden.</small>
                    </div>
                    <div class="font-size-custom modal-clear-hide font-size-custom text-center pb-4" id="ChangePasswordError"></div>
                    <div class="col modal-clear-hide text-center text-center mb-4" id="ChangePasswordLoading">
                        <div class="preloader-wrapper small active">
                            <div class="spinner-layer spinner-green-only">
                                <div class="circle-clipper left"><div class="circle"></div></div>
                                <div class="gap-patch"><div class="circle"></div></div>
                                <div class="circle-clipper right"><div class="circle"></div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer d-flex justify-content-center py-2">
                    <input type="hidden" class="modal-clear-val" id="ChangePasswordId">
                    <button type="button" class="btn btn-outline-cyan px-3 waves-effect waves-light" data-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-cyan px-3 waves-effect waves-light waves-light" id="ModalChangePasswordSubmit">Aceptar</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="ModalNewTicket" tabindex="-1" role="dialog" aria-labelledby="NewTicket" aria-modal="true">
        <div class="modal-dialog modal-dialog-scrollable cascading-modal modal-md" role="document">
            <div class="modal-content">
                <div class="modal-header text-center gradient-card-header blue-gradient">
                    <h6 class="modal-title w-100 font-weight-bold text-left ml-2">Contactar a Soporte</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body modal-body-custom">
                    <div role="alert" class="alert alert-warning font-size-custom show modal-ticket-alert">
                        <span class="alert-span">Se encuentra fuera del horario de atencion.<br>Responderemos su mensaje en cuanto un operador este disponible.</span>
                    </div>
                    <div class="card danger-color lighten-2 text-center z-depth-2 mb-4 font-size-custom col-lg-11 mx-lg-auto modal-ticket-alert-holidays">
                        <div class="card-body px-1">
                            <p class="white-text mb-0">Se encuentra fuera del horario de atencion.<br>El servicio se reanudara al finalizar los dias festivos.<br>Les deseamos Feliz Navidad y prospero Año Nuevo.</p>
                        </div>
                    </div>
                    <div class="col-10 offset-2 md-form mb-5 chat-body white z-depth-1 font-size-custom">
                        <input type="text" id="ModalNewTicketSubject" class="form-control new-ticket-input modal-clear-val" autocomplete="off" maxlength="64">
                        <label class="ml-3" for="ModalNewTicketSubject">Asunto</label>
                    </div>
                    <div class="col modal-clear-hide text-center text-center mt-1" id="ModalNewTicketError">Se pueden adjuntar hasta 5 imagenes</div>
                    <div class="d-flex">
                        <div class="col-2 md-form px-0 file-field" id="ModalNewTicketAttachDiv">
                            <div class="btn btn-floating blue-gradient float-left waves-effect waves-light my-0">
                                <i class="fas fa-paperclip" aria-hidden="true"></i>
                                <input type="file" class="modal-clear-val" id="ModalNewTicketAttach" multiple accept="image/*" title="Adjuntar comprobante">
                            </div>
                            <div class="font-size-custom pt-5" id="ModalNewTicketAttachCount"><span></span> imagen/es</div>
                        </div>
                        <div class="col-10 md-form amber-textarea active-amber-textarea mt-3 chat-body white z-depth-1 font-size-custom" id="ModalNewTicketReply">
                            <textarea id="ModalNewTicketMessage" class="md-textarea form-control" rows="3"></textarea>
                            <label class="ml-3" for="ModalNewTicketMessage">Ingrese aqui el mensaje</label>
                        </div>
                    </div>
                </div>
                <div class="modal-footer justify-content-center py-2">
                    <input type="hidden" class="input-clear-val" id="ModalNewTicketProviderId">
                    <input type="hidden" class="input-clear-val" id="ModalNewTicketTransactionId">
                    <button type="button" class="btn btn-outline-cyan px-3 waves-effect waves-light" data-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-cyan px-3 waves-effect waves-light" id="ModalNewTicketSubmit">Enviar</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="ModalReplyTicket" tabindex="-1" role="dialog" aria-labelledby="ReplyTicket" aria-modal="true">
        <div class="modal-dialog modal-dialog-scrollable cascading-modal modal-md" role="document">
            <div class="modal-content">
                <div class="modal-header text-center gradient-card-header blue-gradient">
                    <h6 class="modal-title w-100 font-weight-bold text-left ml-2">Respuesta de soporte</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body modal-body-custom">
                    <div role="alert" class="alert alert-warning font-size-custom show modal-ticket-alert">
                        <span class="alert-span">Se encuentra fuera del horario de atencion.<br>Responderemos su mensaje en cuanto un operador este disponible.</span>
                    </div>
                    <div class="card danger-color lighten-2 text-center z-depth-2 mb-4 font-size-custom col-lg-11 mx-lg-auto modal-ticket-alert-holidays">
                        <div class="card-body px-1">
                            <p class="white-text mb-0">Se encuentra fuera del horario de atencion.<br>El servicio se reanudara al finalizar los dias festivos.<br>Les deseamos Feliz Navidad y prospero Año Nuevo.</p>
                        </div>
                    </div>
                    <div class="col-12 px-0 pt-3">
                        <div class="chat-message">
                            <ul class="list-unstyled chat"></ul>
                            <div class="col modal-clear-hide text-center text-center mb-4" id="ModalReplyTicketLoading">
                                <div class="preloader-wrapper small active">
                                    <div class="spinner-layer spinner-green-only">
                                        <div class="circle-clipper left"><div class="circle"></div></div>
                                        <div class="gap-patch"><div class="circle"></div></div>
                                        <div class="circle-clipper right"><div class="circle"></div></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col modal-clear-hide text-center text-center mt-1" id="ModalReplyTicketError">Se pueden adjuntar hasta 5 imagenes</div>
                            <div class="d-flex">
                                <div class="col-2 md-form px-0 file-field" id="ModalReplyTicketAttachDiv">
                                    <div class="btn btn-floating blue-gradient float-left waves-effect waves-light my-0">
                                        <i class="fas fa-paperclip" aria-hidden="true"></i>
                                        <input type="file" class="modal-clear-val" id="ModalReplyTicketAttach" multiple accept="image/*" title="Adjuntar comprobante">
                                    </div>
                                    <div class="font-size-custom pt-5" id="ModalReplyTicketAttachCount"><span></span> imagen/es</div>
                                </div>
                                <div class="col-10 md-form amber-textarea active-amber-textarea mt-3 chat-body white z-depth-1 font-size-custom" id="ModalReplyTicketReply">
                                    <textarea id="ModalReplyTicketMessage" class="md-textarea form-control" rows="2"></textarea>
                                    <label class="ml-3" for="ModalReplyTicketMessage">Respuesta</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer justify-content-center py-2">
                    <input type="hidden" class="input-clear-val" id="ModalReplyTicketId">
                    <button type="button" class="btn btn-outline-cyan px-3 waves-effect waves-light" data-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-cyan px-3 waves-effect waves-light" id="ModalReplyTicketSubmit">Responder</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="ModalSupportMail" tabindex="-1" role="dialog" aria-labelledby="SupportMail" aria-modal="true">
        <div class="modal-dialog modal-dialog-scrollable cascading-modal modal-md" role="document">
            <div class="modal-content">
                <div class="modal-header text-center gradient-card-header blue-gradient">
                    <h6 class="modal-title w-100 font-weight-bold text-left ml-2">Contactar a Soporte</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body px-4 py-5">Contactenos via email a la direccion <span id="ModalSupportMailContent"></span></div>
                <div class="modal-footer justify-content-center py-2">
                    <button type="button" class="btn btn-info px-3 waves-effect waves-light" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="ModalNotification" tabindex="-1" role="dialog" aria-labelledby="Notification" aria-modal="true">
        <div class="modal-dialog modal-dialog-scrollable cascading-modal modal-md" role="document">
            <div class="modal-content">
                <div class="modal-header text-center gradient-card-header blue-gradient">
                    <h6 class="modal-title w-100 font-weight-bold text-left ml-2">Notificacion</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="col modal-clear-hide text-center text-center my-4" id="ModalNotificationsLoading">
                    <div class="preloader-wrapper small active">
                        <div class="spinner-layer spinner-green-only">
                            <div class="circle-clipper left"><div class="circle"></div></div>
                            <div class="gap-patch"><div class="circle"></div></div>
                            <div class="circle-clipper right"><div class="circle"></div></div>
                        </div>
                    </div>
                </div>
                <div class="modal-body p-4" id="ModalNotificationsContent"></div>
                <div class="modal-footer justify-content-center py-2">
                    <input type="hidden" class="input-clear-val" id="ModalNotificationsId">
                    <input type="hidden" class="input-clear-val" id="ModalNotificationsStatus">
                    <button type="button" class="btn btn-danger px-3 waves-effect waves-light" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="ModalChangeLanguage" tabindex="-1" role="dialog" aria-labelledby="ChangeLanguage" aria-modal="true">
        <div class="modal-dialog cascading-modal modal-sm col-10 mx-auto" role="document">
            <div class="modal-content">
                <div class="modal-header text-center gradient-card-header blue-gradient">
                    <h6 class="modal-title w-100 font-weight-bold text-left ml-2">Cambiar Idioma</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body col-10 mx-auto" id="RequestLanguage">
                    <div class="md-form my-0">
                    </div>
                </div>
                <div class="modal-footer d-flex justify-content-center py-2">
                    <button type="button" class="btn btn-danger px-3 waves-effect waves-light" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    <div class="alert alert-success alert-dismissible show" role="alert" id="SuccessAlert">
        <button type="button" class="close" id="SuccessAlertClose">
            <span aria-hidden="true">&times;</span>
        </button>
        <i class="fa fa-info mx-2"></i>
        <span class="alert-span"></span>
    </div>
    <!-- CONDITION BrandRegister BEGIN -->
    <div class="modal fade" id="ModalMyAccount" tabindex="-1" role="dialog" aria-labelledby="MyAccount" aria-modal="true">
        <div class="modal-dialog cascading-modal mx-auto" role="document">
            <div class="modal-content">
                <div class="modal-header text-center gradient-card-header blue-gradient">Mi Perfil</div>
                <div class="modal-body col-11 col-md-8 mx-auto" id="MyAccount">
                    <div class="row">
                        <div class="col-12 mb-2">ID de usuario:
                            <span id="ModalMyAccountUserId">HYHEM</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 mb-2">Link de invitacion:
                            <button type="button" class="btn btn-sm btn-info  waves-effect waves-light" id="ModalMyAccountLinkCopy"><i class="far fa-copy"> Copiar</i></button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 mb-2">QR de invitacion
                            <button type="button" class="btn btn-sm btn-info  waves-effect waves-light" id="ModalMyAccountQrDownload"><i class="fas fa-download"> Descargar</i></button>
                        </div>
                        <div class="col-12 mb-2">
                            <img src="" id="ModalMyAccountQr"></image>
                        </div>
                    </div>
                </div>
                <div class="modal-footer d-flex justify-content-center py-2">
                    <button type="button" class="btn btn-danger px-3 waves-effect waves-light" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- CONDITION BrandRegister END -->
    <div aria-live="polite" aria-atomic="true" id="NotificationsToast"></div>
    <div class="card z-depth-2" id="BrowserAdvice">
        <button type="button" class="close" id="BrowserAdviceClose">
            <span aria-hidden="true">&times;</span>
        </button>
        <div class="card-body">
            <h5 class="card-title">Explorador incompatible</h5>
            <p class="card-text">Algunas caracteristicas del sistema no funcionan correctamente con este explorador. Se recomienda utilizar Google Chrome o Mozilla Firefox.</p>
            <p class="card-text card-text-sub">Puede descargarlos desde aqui.</p>
            <div class="d-inline-block px-0">
                <button type="button" class="btn btn-outline-danger btn-md waves-effect waves-light" id="BrowserChrome"><i class="fab fa-chrome"> Chrome</i></button>
            </div>
            <div class="d-inline-block px-0">
                <button type="button" class="btn btn-outline-warning btn-md waves-effect waves-light" id="BrowserFirefox"><i class="fab fa-firefox"> Firefox</i></button>
            </div>
        </div>
    </div>
    <div class="modal fade" id="ModalLoginHistory" tabindex="-1" role="dialog" aria-labelledby="LoginHistory" aria-modal="true">
        <div class="modal-dialog modal-dialog-scrollable cascading-modal modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header text-center gradient-card-header blue-gradient">
                    <h6 class="modal-title w-100 font-weight-bold text-left ml-2">Historial de Ingresos</h6>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body modal-body-custom">
                  <table id="LoginHistoryTable" class="table table-sm table-striped table-hover w-100" cellspacing="0">
                    <thead>
                      <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                    </tbody>
                  </table>
                </div>
                <div class="modal-footer justify-content-center py-2">
                    <button type="button" class="btn btn-danger px-3 waves-effect waves-light" data-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    
  </header>
  <main class="thin auto-wide">
    <div class="container-fluid mb-5">
      <section>
        <div class="col-md-12 p-0">
          <div class="row mt-4 mb-3">
            <div class="col-6 col-lg-9 pt-2 pl-4">
              <h5 class="white-text font-weight-bold">Detalle de Deportes</h5>
            </div>
            <div class="col-6 d-lg-none text-center">
              <button class="d-lg-none btn btn-sm btn-danger waves-effect waves-light"
                id="ShowAffiliatesModal">Estructura</button>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-lg-9 thin" id="main_container">
              <div class="card">
                <div class="card-body p-1 py-4 px-sm-4"">
                  <div class="row">
                    <div class="col-5 offset-2 col-sm-3 offset-sm-1 pr-1">
                      <div class="md-form">
                        <input type="text" id="start_date" class="form-control datepicker">
                        <label for="start_date">Fecha Inicial</label>
                      </div>
                    </div>
                    <div class="col-3 col-sm-2 pl-1">
                      <div class="md-form">
                        <input type="text" id="start_time" class="form-control timepicker">
                        <label for="start_time">Hora Inicial</label>
                      </div>
                    </div>
                    <div class="col-5 offset-2 col-sm-3 offset-sm-0 pr-1">
                      <div class="md-form">
                        <input type="text" id="end_date" class="form-control datepicker">
                        <label for="end_date">Fecha Final</label>
                      </div>
                    </div>
                    <div class="col-3 col-sm-2 pl-1">
                      <div class="md-form">
                        <input type="text" id="end_time" class="form-control timepicker">
                        <label for="end_time">Hora Final</label>
                      </div>
                    </div>
                    <div class="col-8 offset-2 col-sm-4 offset-sm-1 col-lg-4 col-xl-3 offset-xl-0 pb-xl-4 order-xl-2">
                      <div class="md-form font-size-custom2 text-left my-3">
                        <input type="text" id="UserSearch" class="form-control mdb-autocomplete search-username" maxlength="16">
                        <label for="UserSearch">Nombre de usuario</label>
                        <button class="mdb-autocomplete-clear">
                          <svg fill="#000000" height="20" viewBox="0 0 20 20" width="20" xmlns="https://www.w3.org/2000/svg">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                            <path d="M0 0h24v24H0z" fill="none" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div class="col-8 offset-2 col-sm-3 offset-sm-0 pb-xl-4 order-xl-3">
                      <div class="md-form my-3">
                        <input type="text" class="form-control" id="bet_id" maxlength="16">
                        <label for="bet_id">#Id apuesta</label>
                      </div>
                    </div>
                    <div class="col-6 col-sm-4 col-md-3 offset-md-0 col-lg-3 col-xl-2 pl-md-3 pt-3 pt-xl-4 pt-md-3 pb-4 order-1 order-sm-1 order-xl-4">
                      <div class="form-check form-check-inline">
                        <input type="checkbox" class="form-check-input" id="only_pending">
                        <label class="form-check-label pl-4" for="only_pending">Pendientes</label>
                      </div>
                    </div>
                    <div class="col-5 offset-1 col-sm-3 offset-sm-1 col-lg-3 col-xl-3 offset-xl-0 pt-2 pt-xl-3 pb-4 pb-sm-3 text-center text-xl-right order-sm-2 order-xl-1">
                      <button class="btn btn-sm btn-cyan waves-effect waves-light" id="search">Buscar</button>
                    </div>
                  </div>
                  <table id="history" class="table table-striped table-hover w-100" cellspacing="0">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                    </tbody>
                    <tfoot>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col" class="d-none d-sm-block"></th>
                        <th scope="col" class=""></th>
                        <th scope="col" class="d-none d-sm-block"></th>
                        <th scope="col" class="" id="FooterTotalAmount"></th>
                        <th scope="col" class="d-none d-sm-block"></th>
                        <th scope="col" class="d-none d-md-block" id="FooterTotalPossibleWin"></th>
                      </tr>
                    </tfoot>                      
                  </table>
                </div>
              </div>
            </div>
            <div class="d-none d-lg-block col-lg-3 offset-lg-0 pt-4 pt-lg-0 pl-md-0 wide"
              id="affiliates_tree_container">
            </div>
          </div>
        </div>
      </section>
    </div>
    <div class="modal fade left" id="affiliates_tree_modal" tabindex="-1" role="dialog" aria-labelledby="affTreeModal" aria-hidden="true">
      <div class="modal-dialog modal-full-height cascading-modal modal-left" role="document">
        <div class="modal-content">
          <div class="modal-header gradient-card-header blue-gradient">
            <h5 class="modal-title w-100" id="AffTreeModal">Listado de Agentes</h5>
            <button type="button" class="close affiliates_tree_modal_close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" id="affiliates_tree_modal_container"></div>
          <div class="modal-footer justify-content-center">
            <button type="button" class="btn btn-secondary affiliates_tree_modal_close">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="ModalBetDetails" tabindex="-1" role="dialog" aria-labelledby="BetDetails" aria-hidden="true">
        <div class="modal-dialog modal-lg cascading-modal" role="document">
            <div class="modal-content">
                <div class="modal-header text-center gradient-card-header blue-gradient">
                    <h5 class="modal-title w-100 font-weight-bold text-left ml-2" id="ModalBetDetailsTitle">Detalle de apuesta</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>              
                <div class="modal-body">
                    <div class="col text-center" id="ModalBetDetailsLoading">
                        <div class="preloader-wrapper big active">
                            <div class="spinner-layer spinner-green-only">
                                <div class="circle-clipper left"><div class="circle"></div></div>
                                <div class="gap-patch"><div class="circle"></div></div>
                                <div class="circle-clipper right"><div class="circle"></div></div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 d-inline-table" id="ModalBetDetailsData">
                            <div class="row border-bottom">
                                <div class="col-6">ID interna</div>
                                <div class="col-6" id="ModalBetDetailsId"></div>
                            </div>
                            <div class="row border-bottom">
                                <div class="col-6">Fecha</div>
                                <div class="col-6" id="ModalBetDetailsDate"></div>
                            </div>
                            <div class="row border-bottom">
                                <div class="col-6">Jugador</div>
                                <div class="col-6" id="ModalBetDetailsPlayer"></div>
                            </div>
                            <div class="row border-bottom">
                                <div class="col-6">Tipo</div>
                                <div class="col-6" id="ModalBetDetailsTypeId"></div>
                            </div>
                            <div class="row border-bottom">
                                <div class="col-6">Juego</div>
                                <div class="col-6" id="ModalBetDetailsGameId"></div>
                            </div>
                            <div class="row border-bottom">
                                <div class="col-6">Apostado</div>
                                <div class="col-6" id="ModalBetDetailsStake"></div>
                            </div>
                            <div class="row border-bottom">
                                <div class="col-6">Cuota</div>
                                <div class="col-6" id="ModalBetDetailsOdds"></div>
                            </div>
                            <div class="row border-bottom">
                                <div class="col-6">Cobrado</div>
                                <div class="col-6" id="ModalBetDetailsWinLoss"></div>
                            </div>
                            <div class="row border-bottom">
                                <div class="col-6">Ganancia posible</div>
                                <div class="col-6" id="ModalBetDetailsPossibleWin"></div>
                            </div>
                            <div class="row border-bottom">
                                <div class="col-6">Estado</div>
                                <div class="col-6" id="ModalBetDetailsStatus"></div>
                            </div>
                            <div class="row">
                              <div class="col-12 mx-auto text-center">
                                <a href="#" id="ModalBetDetailsTransactions">Ver evolucion de la apuesta</a>
                              </div>
                            </div>
                            <div id="ModalBetDetailsEvents"></div>
                        </div>
                    </div>
                </div>        
                <div class="modal-footer d-flex justify-content-center py-2">
                    <button type="button" class="btn btn-cyan px-4" data-dismiss="modal">Cerrar</button>
                </div>      
            </div>
        </div>
    </div>

    <div class="modal fade" id="ModalBetTransactions" tabindex="-1" role="dialog" aria-labelledby="BetTransactions" aria-hidden="true">
      <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
        <div class="modal-content">
          <div class="modal-header text-center gradient-card-header blue-gradient">
            <h5 class="modal-title w-100 font-weight-bold text-left ml-2">Evolucion de la Apuesta</h5>
            <button type="button" class="close white-text" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12 d-inline-table" id="ModalBetTransactionsData"></div>
            </div>
          </div>
          <div class="modal-footer d-flex justify-content-center py-2">
            <button type="button" class="btn btn-cyan px-4 waves-effect waves-light" data-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="ModalUserPaidConfirm" tabindex="-1" role="dialog" aria-labelledby="UserPaidConfirm" aria-modal="true">
        <div class="modal-dialog modal-sm cascading-modal modal-notify modal-warning" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title w-100 font-weight-bold text-left ml-2">Marcar como pagado</h6>
                </div>
                <div class="modal-body">
                    <div class="text-center mb-2">
                        <p>Confirmar pago de la apuesta.</p>
                    </div>
                    <div class="edit-user-confirm-notify font-size-custom pt-3 text-center">
                        Esta accion no puede revertirse.
                    </div>
                    <div class="col modal-clear-hide text-center text-center mb-4" id="UserPaidConfirmLoading">
                        <div class="preloader-wrapper small active">
                            <div class="spinner-layer spinner-green-only">
                                <div class="circle-clipper left"><div class="circle"></div></div>
                                <div class="gap-patch"><div class="circle"></div></div>
                                <div class="circle-clipper right"><div class="circle"></div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer justify-content-center">
                    <input type="hidden" class="modal-clear-val" id="UserPaidConfirmBetId">
                    <button type="button" class="btn btn-sm btn-outline-warning waves-effect" data-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-sm btn-warning waves-effect waves-light" id="UserPaidConfirmSubmit">Confirmar</button>
                </div>
            </div>
        </div>
    </div>
  </main>
  <script type="text/javascript">
    document.body.dataset.base_server_path='';document.body.dataset.brand_id='13';document.body.dataset.brand_support='1';document.body.dataset.cdn_url='https://cdn.admin.siempregana.net/';document.body.dataset.current_language='es';document.body.dataset.current_user_id='26270';document.body.dataset.current_username='pastblind1';document.body.dataset.datatable_title_action='Accion';document.body.dataset.datatable_title_agent='Dispositivo';document.body.dataset.datatable_title_date='Fecha';document.body.dataset.datatable_title_ip='Direccion IP';document.body.dataset.force_change_passwd='-1';document.body.dataset.is_mobile='';document.body.dataset.item_select='Seleccionar';document.body.dataset.number_format='1';document.body.dataset.room_id='10';document.body.dataset.session_token='b9ca0a9d7d5b255312def94b17f61b5c914089c6295b714777c2299170a0d3ac';document.body.dataset.site_start='2019-07-01';document.body.dataset.support_new_ticket='Contactar a Soporte';document.body.dataset.support_nickname='Soporte';document.body.dataset.users_notification='Notificacion';document.body.dataset.sports_bet_print='0';document.body.dataset.site_url='admin.play.siempregana.net';document.body.dataset.rtoken='https://play.siempregana.net/?rtoken=HYHEM';document.body.dataset.datatable_title_bet_id='ID Apuesta';document.body.dataset.datatable_title_username='Usuario';document.body.dataset.datatable_title_status='Estado';document.body.dataset.datatable_title_debit='Importe';document.body.dataset.datatable_title_credit='Resultado';document.body.dataset.datatable_title_possible_win='A Ganar';
  </script>
  <script type="text/javascript">
    var own_balance_init = '{"notifications":[{"id":"1647387001.1","subject":"Cambios en Reportes Globales","status":"read","time":"27d"},{"id":"1614690793.1","subject":"Incorporaci\u00f3n de SubAgentes","status":"read","time":"Mar 2021"}],"support":[],"balance":"2.279,50"}';
  </script>
  
  <script src="https://unpkg.com/autonumeric"></script>
  
  
  <script src="https://cdn.admin.siempregana.net/js/jquery-3.3.1.min.js"></script>
  
  <script src="https://cdn.admin.siempregana.net/js/popper.min.js"></script>
  
  <script src="https://cdn.admin.siempregana.net/js/bootstrap.min.js"></script>
  
  <script src="https://cdn.admin.siempregana.net/js/mdb-min.js"></script>
  
  <script src="https://cdn.admin.siempregana.net/lang/datepicker/es-min.js"></script>
  
  <script src="https://cdn.admin.siempregana.net/js/addons/datatables.min.js"></script>
  
  <script src="https://cdn.admin.siempregana.net/js/lightbox-min.js"></script>
  
  <script src="https://cdn.admin.siempregana.net/js/jstree-min.js"></script>
  
  <script src="https://cdn.admin.siempregana.net/js/side_menu-min.js"></script>
  
  <script src="https://cdn.admin.siempregana.net/js/report_provider210-min.js"></script>
  
  
</body>
</html>