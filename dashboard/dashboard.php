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
    
    <link rel="stylesheet" type='text/css' href="https://cdn.admin.siempregana.net/css/users_quick_modal-min.css">
    
    <link rel="stylesheet" type='text/css' href="https://cdn.admin.siempregana.net/css/dashboard-min.css">
    
    
    
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css">
    
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/roboto-fontface@0.10.0/css/roboto/roboto-fontface.min.css">
    
    </head>
    <body class="fixed-sn white-skin">
        <div class="alert alert-warning alert-dismissible show" role="alert" id="UsersAlert">
            <button type="button" class="close" id="UsersAlertClose">
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
        <main class="thin">
            <div class="container-fluid mb-5 px-1 px-sm-2">
                <section>
                    <div class="row mt-4 mb-3 mx-lg-0">  

                        <div class="col-12 col-lg-6 col-xl-4 pb-4 px-lg-1 text-center">
                            <div class="card card-cascade narrower">
                                <div class="view view-cascade gradient-card-header blue py-2 py-lg-3">
                                    <h5 class="mb-0">Carga rapida</h5>
                                </div>
                                <div class="card-body card-body-cascade text-center px-1 pb-1 pt-lg-5 pb-lg-4 pt-xl-4 pb-lg-4" id="QuickUse_container">
                                    <div class="row mx-auto">  
                                        <div class="col-6 px-0 text-center">
                                            <button class="btn btn-sm btn-danger waves-effect waves-light" id="NewPlayerButton"><i class="fas fa-user"></i> Nuevo Jugador</button>
                                        </div>
                                        <div class="col-6 px-0 text-center">
                                            <button class="btn btn-sm btn-danger waves-effect waves-light" id="NewAffiliateButton" ><i class="fas fa-users"></i> Nuevo Agente</button>
                                        </div>  
                                        <div id="UserSearchDiv" class="col-12 mt-3 mb-lg-3">
                                            <div class="row mx-auto">
                                                <div class="col-6 col-sm-5 offset-sm-1 col-lg-6 offset-lg-0 mt-3">
                                                    <div class="md-form font-size-custom2 mt-2 mb-md-1 my-lg-2">
                                                        <input type="text" id="UserSearch" class="form-control search-username" maxlength="16" placeholder="Nombre de usuario">
                                                    </div>
                                                </div>
                                                <div class="col-2 offset-1 mt-3">
                                                    <button class='mb-1 mt-1 ml-0 mr-1 ml-md-2 btn btn-floating cyan waves-effect waves-light btn-action btn-credit btn-add-credit' alt='Cargar Fichas' title='Cargar Fichas'><i class='fas fa-plus' aria-hidden='true'></i></button>
                                                </div>
                                                <div class="col-2 mt-3 ml-2">
                                                    <button class='mb-1 mt-1 mx-0 mx-sm-2 btn btn-floating cyan waves-effect waves-light btn-action btn-credit btn-deduct-credit' alt='Descargar Fichas' title='Descargar Fichas'><i class='fas fa-minus' aria-hidden='true'></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="alert" role="alert" id="QuickUse_alert">
                                        <i class="fa fa-info mx-2"></i>
                                        <span class="alert-span"></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-lg-6 col-xl-4 pb-4 px-lg-1 text-center">
                            <div class="card card-cascade narrower">
                                <div class="view view-cascade gradient-card-header blue py-2 py-lg-3">
                                    <h5 class="mb-0">Ganancia neta</h5>
                                </div>
                                <div class="card-body card-body-cascade text-center pt-xl-2 pb-xl-3" id="MonthlyEarning_container">
                                    <div class="preloader-wrapper big active">
                                        <div class="spinner-layer spinner-blue-only">
                                            <div class="circle-clipper left"><div class="circle"></div></div>
                                            <div class="gap-patch"><div class="circle"></div></div>
                                            <div class="circle-clipper right"><div class="circle"></div></div>
                                        </div>
                                    </div>
                                    <div class="col-md-10 mx-auto text-center d-none">              
                                        <p class="my-4">Mes actual: <strong><span id="MonthlyEarningCurrent" class="hide-value"></span></strong></p>
                                        <p class="my-4">Mes anterior: <strong><span id="MonthlyEarningPrevious" class="hide-value"></span></strong></p>
                                        <h5 class="my-4">
                                            <span class="badge p-2" id="MonthlyEarningTrend">Tendencia <i class="fas ml-1"></i></span>
                                            <i class="ml-3 far fa-eye-slash hide-values"></i>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-lg-6 col-xl-4 pb-4 px-lg-1 text-center ">
                            <div class="card card-cascade narrower">
                                <div class="view view-cascade gradient-card-header blue py-2 py-lg-3">
                                    <h5 class="mb-0">Netwin Mensual</h5>
                                </div>
                                <div class="card-body card-body-cascade text-center" id="Netwin_container">
                                    <div class="preloader-wrapper big active">
                                        <div class="spinner-layer spinner-blue-only">
                                            <div class="circle-clipper left"><div class="circle"></div></div>
                                            <div class="gap-patch"><div class="circle"></div></div>
                                            <div class="circle-clipper right"><div class="circle"></div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-lg-6 col-xl-4 pb-4 px-lg-1 text-center ">
                            <div class="card card-cascade narrower">
                                <div class="view view-cascade gradient-card-header blue py-2 py-lg-3">
                                    <h5 class="mb-0">Netwin Diario</h5>
                                </div>
                                <div class="card-body card-body-cascade text-center" id="NetwinDaily_container">
                                    <div class="preloader-wrapper big active">
                                        <div class="spinner-layer spinner-blue-only">
                                            <div class="circle-clipper left"><div class="circle"></div></div>
                                            <div class="gap-patch"><div class="circle"></div></div>
                                            <div class="circle-clipper right"><div class="circle"></div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        
                        <div class="col-12 col-lg-6 col-xl-4 pb-4 px-lg-1 text-center ">
                            <div class="card card-cascade narrower">
                                <div class="view view-cascade gradient-card-header blue py-2 py-lg-3">
                                    <h5 class="mb-0">Top Agentes del mes</h5>
                                </div>
                                <div class="card-body card-body-cascade text-center" id="TopAffiliates_container">
                                    <div class="preloader-wrapper big active">
                                        <div class="spinner-layer spinner-blue-only">
                                            <div class="circle-clipper left"><div class="circle"></div></div>
                                            <div class="gap-patch"><div class="circle"></div></div>
                                            <div class="circle-clipper right"><div class="circle"></div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        
                        
                    </div>  
                </section>
            </div>

            
            <div class="modal fade" id="ModalCredit" tabindex="-1" role="dialog" aria-labelledby="Credit" aria-hidden="true">
                <div class="modal-dialog modal-sm cascading-modal" role="document">
                    <div class="modal-content">
                        <div class="modal-header text-center gradient-card-header blue-gradient">
                            <h5 class="modal-title w-100 font-weight-bold text-left ml-0" id="ModalCreditTitle">{users_modal_credit_title}</h5>
                            <button type="button" class="close mr-0" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>              
                        <div class="alert alert-warning alert-dismissible show p-2 mb-1" role="alert" id="ModalCreditAlert">
                            <i class="fas fa-exclamation-triangle mx-2"></i>
                            <span class="alert-span">Este no es un usuario directo</span>
                        </div>
                        <div class="modal-body mx-3 px-1">
                            <div class="col text-center" id="ModalCreditLoading">
                                <div class="preloader-wrapper big active">
                                    <div class="spinner-layer spinner-green-only">
                                        <div class="circle-clipper left"><div class="circle"></div></div>
                                        <div class="gap-patch"><div class="circle"></div></div>
                                        <div class="circle-clipper right"><div class="circle"></div></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col text-center px-0" id="ModalCreditContent">
                                <div class="input-group mb-3 d-none" id="ModalCreditSourceContent">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text input-modal-addon">
                                            <i class="fas fa-user" aria-hidden="true"></i>
                                        </span>
                                    </div>            
                                    <input type="text" class="d-inline-block form-control form-modal-input modal-clear-val text-primary" id="ModalCreditSourceUsername" readonly>
                                    <input type="text" class="d-inline-block form-control form-modal-input modal-clear-val text-right" id="ModalCreditSourceBalance" readonly>
                                    <input type="hidden" class="modal-clear-val" id="ModalCreditSourceId">
                                </div>
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text input-modal-addon">
                                            <i class="fas fa-user" aria-hidden="true"></i>
                                        </span>
                                    </div>            
                                    <input type="text" class="d-inline-block form-control form-modal-input modal-clear-val" id="ModalCreditDestinationUsername" readonly>
                                    <input type="text" class="d-inline-block form-control form-modal-input modal-clear-val text-right" id="ModalCreditDestinationBalance" readonly>
                                    <input type="hidden" class="modal-clear-val" id="ModalCreditDestinationId">
                                </div>
                                <div class="row mb-4 px-0">
                                    <div class="input-group col-8 col-xl-8 pr-1">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text input-modal-addon">
                                                <i class="fas fa-coins" aria-hidden="true"></i>
                                            </span>
                                        </div>
                                        <input type="text" class="form-control form-modal-input text-right" id="ModalCreditAmount" aria-label="Amount" autocomplete="off">
                                        <input type="hidden" class="modal-clear-val" id="ModalCreditAction">
                                    </div>
                                    <div class="input-group col-4 col-xl-4 p-0 text-center">
                                        <!-- CONDITION NumberFormat1 BEGIN -->
                                        <button class='mb-1 mt-1 mr-1 btn btn-floating cyan waves-effect waves-light btn-action btn-credit-mod btn-add' step="50" id="ModalCreditAdd" title='Aumentar'><i class='fas fa-plus' aria-hidden='true'></i></button>
                                        <button class='mb-1 mt-1 btn btn-floating cyan waves-effect waves-light btn-action btn-credit-mod btn-deduct' step="-50" id="ModalCreditDeduct" title='Disminuir'><i class='fas fa-minus' aria-hidden='true'></i></button>
                                        <!-- CONDITION NumberFormat1 END -->
                                                                            </div>
                                </div>
                                <div class="row px-2 px-sm-2 mb-2 px-xl-2">
                                    <div class="input-group col-12 p-0 text-center">
                                        <!-- CONDITION NumberFormat1 BEGIN -->
                                        <button class='mb-1 mt-1 mr-2 mr-sm-2 mr-xl-2 btn btn-outline-cyan btn-sm px-3 waves-effect waves-light btn-action-sub btn-credit-mod btn-add100' step="100" id="ModalCreditAdd100" title='Aumentar 100'><i class='fas fa-plus' aria-hidden='true'></i> 100</button>
                                        <button class='mb-1 mt-1 mr-2 mr-sm-2 mr-xl-2 btn btn-outline-cyan btn-sm px-3 waves-effect waves-light btn-action-sub btn-credit-mod btn-add1000' step="1000" id="ModalCreditAdd1000" title='Aumentar 1.000'><i class='fas fa-plus' aria-hidden='true'></i> 1.000</button>
                                        <button class='mb-1 mt-1 btn btn-outline-cyan btn-sm px-3 waves-effect waves-light btn-action-sub btn-credit-mod btn-add10000' step="10000" id="ModalCreditAdd10000" title='Aumentar 10.000'><i class='fas fa-plus' aria-hidden='true'></i>  10.000</button>
                                        <!-- CONDITION NumberFormat1 END -->
                                                                            </div>
                                </div>
                                <div class="row pt-3 px-2 px-xl-2 modal-credit-register-finance d-none">
                                    <div class="col-10 text-left">
                                        <div class="row d-none">
                                            <div class="col-12 form-check text-left">
                                                <input type="checkbox" class="form-check-input" id="ModalCreditRegisterFinanceCollect">
                                                <label class="form-check-label font-size-custom" for="ModalCreditRegisterFinanceCollect"></label>
                                            </div>
                                        </div>
                                        <div class="row d-none">
                                            <div class="col-12 form-check text-left">
                                                <input type="checkbox" class="form-check-input" id="ModalCreditRegisterFinanceBonification">
                                                <label class="form-check-label font-size-custom" for="ModalCreditRegisterFinanceBonification">Registrar Bonificado</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-2 px-0">
                                        <button title="Saldo en finanzas" id="ModalCreditFinanceBalance" class="mb-1 mt-1 mr-1 btn btn-floating cyan waves-effect waves-light btn-action" data-toggle="popover-hover" data-content="" data-original-title="">
                                            <i class="fas fa-dollar-sign" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>        
                        <div class="modal-footer d-flex justify-content-center py-2">
                            <button type="button" class="btn btn-outline-cyan px-3" data-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-cyan px-3" id="ModalCreditSubmit">Aceptar</button>
                        </div>      
                    </div>
                </div>
            </div>

            <div class="modal fade" id="ModalNewUser" tabindex="-1" role="dialog" aria-labelledby="NewUser" aria-hidden="true">
                <div class="modal-dialog cascading-modal" role="document">
                    <div class="modal-content">
                        <div class="modal-c-tabs">
                            <ul class="nav nav-tabs md-tabs tabs-2 btn-cyan darken-3 gradient-card-header blue-gradient" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link modal-clear-tab active" data-toggle="tab" href="#NewUserTabPlayer" id="NewUserTabPlayerPanel" role="tab"><i class="fas fa-user-plus mr-1"></i>
                                        Jugador</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-toggle="tab" href="#NewUserTabAffiliate" id="NewUserTabAffiliatePanel" role="tab"><i class="fas fa-user-plus mr-1"></i>
                                        Agente</a>
                                </li>
                            </ul>
                            <div class="tab-content">
                                <div class="tab-pane fade in show active" id="NewUserTabPlayer" role="tabpanel">
                                    <div class="modal-body mx-1 px-1">
                                        <ul class="nav md-pills pills-danger">
                                            <li class="nav-item">
                                                <a class="nav-link modal-clear-tab active" data-toggle="tab" id="NewUserTabPlayer1Link" href="#NewUserTabPlayer1" role="tab">Ingreso</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-toggle="tab" id="NewUserTabPlayer2Link" href="#NewUserTabPlayer2" role="tab">Datos personales</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-toggle="tab" id="NewUserTabPlayer3Link" href="#NewUserTabPlayer3" role="tab">Permisos</a>
                                            </li>
                                        </ul>
                                        <div class="tab-content">
                                            <div class="tab-pane fade in show active col-8 col-sm-6 mx-auto" id="NewUserTabPlayer1" role="tabpanel">
                                                <div class="md-form mb-5 font-size-custom">
                                                    <i class="fas fa-user prefix grey-text"></i>
                                                    <input type="text" id="NewUserPlayerUsername" class="form-control new-player-input modal-clear-val" autocomplete="off" maxlength="16">
                                                    <label for="NewUserPlayerUsername">Nombre de Usuario</label>
                                                    <small id="NewUserPlayerUsernameFormat" class="form-text modal-clear-hide text-muted">El nombre de usuario debe contener entre 4 y 16 caracteres.</small>
                                                </div>
                                                <div class="md-form mb-5 font-size-custom">
                                                    <i class="fas fa-eye prefix password-reveal grey-text" data-user-type="Player"></i>
                                                    <input type="text" id="NewUserPlayerPassword" class="form-control new-player-input password-toggle modal-clear-val" autocomplete="off" maxlength="16">
                                                    <label for="NewUserPlayerPassword">Contraseña</label>
                                                    <small id="NewUserPlayerPasswordFormat" class="form-text modal-clear-hide text-muted">La contraseña debe contener entre 6 y 16 caracteres.</small>
                                                </div>
                                                <div class="font-size-custom modal-clear-hide" id="NewUserPlayerError"></div>
                                                <div class="col modal-clear-hide text-center" id="NewUserPlayerLoading">
                                                    <div class="preloader-wrapper small active">
                                                        <div class="spinner-layer spinner-green-only">
                                                            <div class="circle-clipper left"><div class="circle"></div></div>
                                                            <div class="gap-patch"><div class="circle"></div></div>
                                                            <div class="circle-clipper right"><div class="circle"></div></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade in show col-10 mx-auto" id="NewUserTabPlayer2" role="tabpanel">
                                                <div class="md-form mb-5 font-size-custom">
                                                    <i class="far fa-user prefix grey-text"></i>
                                                    <input type="text" id="NewUserPlayerName" class="form-control new-player-input modal-clear-val" autocomplete="off" maxlength="32">
                                                    <label for="NewUserPlayerName">Nombre completo</label>
                                                </div>
                                                <div class="md-form mb-5 font-size-custom">
                                                    <i class="far fa-id-card prefix grey-text"></i>
                                                    <input type="text" id="NewUserPlayerPassport" class="form-control new-player-input modal-clear-val" autocomplete="off" maxlength="32">
                                                    <label for="NewUserPlayerPassport">Documento</label>
                                                </div>
                                                <div class="md-form mb-5 font-size-custom">
                                                    <i class="far fa-envelope prefix grey-text"></i>
                                                    <input type="text" id="NewUserPlayerEmail" class="form-control new-player-input modal-clear-val" autocomplete="off" maxlength="32">
                                                    <label for="NewUserPlayerEmail">Email</label>
                                                </div>
                                                <div class="md-form mb-5 font-size-custom">
                                                    <i class="fas fa-mobile-alt prefix grey-text"></i>
                                                    <input type="text" id="NewUserPlayerPhone" class="form-control new-player-input modal-clear-val" autocomplete="off" maxlength="16">
                                                    <label for="NewUserPlayerPhone">Telefono</label>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade in pt-3 show" id="NewUserTabPlayer3" role="tabpanel">
                                                <div class="clear-providers" id="NewUserPlayerProviders"></div>
                                            </div>
                                        </div>
                                    </div>        
                                    <div class="modal-footer d-flex justify-content-center py-2">
                                        <button type="button" class="btn btn-outline-cyan px-4" data-dismiss="modal">Cancelar</button>
                                        <button type="button" class="btn btn-cyan px-4" id="ModalNewUserPlayerSubmit">Aceptar</button>
                                    </div>      
                                </div>
                                <div class="tab-pane fade" id="NewUserTabAffiliate" role="tabpanel">
                                    <div class="modal-body mx-1 px-1">
                                        <ul class="nav md-pills pills-danger pills-affiliate">
                                            <li class="nav-item">
                                                <a class="nav-link modal-clear-tab active" data-toggle="tab" id="NewUserTabAffiliate1Link" href="#NewUserTabAffiliate1" role="tab">Ingreso</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-toggle="tab" id="NewUserTabAffiliate2Link" href="#NewUserTabAffiliate2" role="tab">Datos personales</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-toggle="tab" id="NewUserTabAffiliate3Link" href="#NewUserTabAffiliate3" role="tab">Permisos</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-toggle="tab" id="NewUserTabAffiliate4Link" href="#NewUserTabAffiliate4" role="tab">Comisiones</a>
                                            </li>
                                        </ul>
                                        <div class="tab-content">
                                            <div class="tab-pane fade in show active col-8 col-sm-6 mx-auto" id="NewUserTabAffiliate1" role="tabpanel">
                                                <div class="md-form mb-5 font-size-custom">
                                                    <i class="fas fa-user prefix grey-text"></i>
                                                    <input type="text" id="NewUserAffiliateUsername" class="form-control new-affiliate-input modal-clear-val" autocomplete="off" maxlength="16">
                                                    <label for="NewUserAffiliateUsername">Nombre de Usuario</label>
                                                    <small id="NewUserAffiliateUsernameFormat" class="form-text modal-clear-hide text-muted">El nombre de usuario debe contener entre 4 y 16 caracteres.</small>
                                                </div>
                                                <div class="md-form mb-5 font-size-custom">
                                                    <i class="fas fa-eye prefix password-reveal grey-text" data-user-type="Affiliate"></i>
                                                    <input type="text" id="NewUserAffiliatePassword" class="form-control new-affiliate-input password-toggle modal-clear-val" autocomplete="off" maxlength="16">
                                                    <label for="NewUserAffiliatePassword">Contraseña</label>
                                                    <small id="NewUserAffiliatePasswordFormat" class="form-text modal-clear-hide text-muted">La contraseña debe contener entre 6 y 16 caracteres.</small>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade in show col-10 mx-auto pb-4" id="NewUserTabAffiliate2" role="tabpanel">
                                                <div class="md-form mb-5 font-size-custom">
                                                    <i class="far fa-user prefix grey-text"></i>
                                                    <input type="text" id="NewUserAffiliateName" class="form-control new-affiliate-input modal-clear-val" autocomplete="off" maxlength="32">
                                                    <label for="NewUserAffiliateName">Nombre completo</label>
                                                </div>
                                                <div class="md-form mb-5 font-size-custom">
                                                    <i class="far fa-id-card prefix grey-text"></i>
                                                    <input type="text" id="NewUserAffiliatePassport" class="form-control new-player-input modal-clear-val" autocomplete="off" maxlength="32">
                                                    <label for="NewUserAffiliatePassport">Documento</label>
                                                </div>
                                                <div class="md-form mb-5 font-size-custom">
                                                    <i class="far fa-envelope prefix grey-text"></i>
                                                    <input type="text" id="NewUserAffiliateEmail" class="form-control new-affiliate-input modal-clear-val" autocomplete="off" maxlength="32">
                                                    <label for="NewUserAffiliateEmail">Email</label>
                                                </div>
                                                <div class="md-form mb-5 font-size-custom">
                                                    <i class="fas fa-mobile-alt prefix grey-text"></i>
                                                    <input type="text" id="NewUserAffiliatePhone" class="form-control new-affiliate-input modal-clear-val" autocomplete="off" maxlength="16">
                                                    <label for="NewUserAffiliatePhone">Telefono</label>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade in show pt-2 pt-sm-4" id="NewUserTabAffiliate3" role="tabpanel">
                                                <div class="clear-providers" id="NewUserAffiliateProviders"></div>
                                            </div>
                                            <div class="tab-pane fade in show pt-2" id="NewUserTabAffiliate4" role="tabpanel">
                                                <div class="row pb-1">
                                                    <div class="d-none">Periodo de liquidacion</div>
                                                    <div class="col-6 offset-3 col-md-4 offset-md-4">
                                                        <select class="mdb-select colorful-select dropdown-primary md-form" id="NewUserAffiliateSettlementPeriod">
                                                            <option value="1" selected>Mensual</option>
                                                            <option value="2">Semanal</option>
                                                        </select>
                                                        <label for="NewUserAffiliateSettlementPeriod">Liquidar automaticamente</label>
                                                    </div>
                                                </div>
                                                <div class="clear-providers" id="NewUserAffiliateCommissions"></div>
                                            </div>
                                        </div>  
                                    </div>
                                    <div class="font-size-custom modal-clear-hide font-size-custom text-center pb-4" id="NewUserAffiliateError"></div>
                                    <div class="col modal-clear-hide text-center" id="NewUserAffiliateLoading">
                                        <div class="preloader-wrapper small active">
                                            <div class="spinner-layer spinner-green-only">
                                                <div class="circle-clipper left"><div class="circle"></div></div>
                                                <div class="gap-patch"><div class="circle"></div></div>
                                                <div class="circle-clipper right"><div class="circle"></div></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer d-flex justify-content-center py-2">
                                        <button type="button" class="btn btn-outline-cyan px-4" data-dismiss="modal">Cancelar</button>
                                        <button type="button" class="btn btn-cyan px-4" id="ModalNewUserAffiliateSubmit">Aceptar</button>
                                    </div>      
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </main>
        <script type="text/javascript">
            document.body.dataset.base_server_path='';document.body.dataset.brand_id='13';document.body.dataset.brand_support='1';document.body.dataset.cdn_url='https://cdn.admin.siempregana.net/';document.body.dataset.current_language='es';document.body.dataset.current_user_id='26270';document.body.dataset.current_username='pastblind1';document.body.dataset.datatable_title_action='Accion';document.body.dataset.datatable_title_agent='Dispositivo';document.body.dataset.datatable_title_date='Fecha';document.body.dataset.datatable_title_ip='Direccion IP';document.body.dataset.force_change_passwd='-1';document.body.dataset.is_mobile='';document.body.dataset.item_select='Seleccionar';document.body.dataset.number_format='1';document.body.dataset.room_id='10';document.body.dataset.session_token='d41dffe20e874460a0113e64d4d2181315687c4c837833f7bf42b354b60f31e9';document.body.dataset.site_start='2019-07-01';document.body.dataset.support_new_ticket='Contactar a Soporte';document.body.dataset.support_nickname='Soporte';document.body.dataset.users_notification='Notificacion';document.body.dataset.sports_bet_print='0';document.body.dataset.site_url='admin.play.siempregana.net';document.body.dataset.rtoken='https://play.siempregana.net/?rtoken=HYHEM';document.body.dataset.username_search='';document.body.dataset.dashboard_current_month='Mes actual';document.body.dataset.dashboard_previous_month='Mes anterior';document.body.dataset.users_modal_credit_add_title='Cargar Fichas';document.body.dataset.users_modal_credit_deduct_title='Descargar Fichas';document.body.dataset.users_modal_credit_finance_collect_title='Registrar Cobrado';document.body.dataset.users_modal_credit_finance_payout_title='Registrar Pagado';document.body.dataset.multi_select_all='Todos';
        </script>
        <script type="text/javascript">
            var own_balance_init = '{"notifications":[{"id":"1647387001.1","subject":"Cambios en Reportes Globales","status":"read","time":"22d"},{"id":"1614690793.1","subject":"Incorporaci\u00f3n de SubAgentes","status":"read","time":"Mar 2021"}],"support":[],"balance":"2.279,50"}';
        </script>
        
        <script src="https://unpkg.com/autonumeric"></script>
        
        <script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>
        
        
        <script src="https://cdn.admin.siempregana.net/js/jquery-3.3.1.min.js"></script>
        
        <script src="https://cdn.admin.siempregana.net/js/popper.min.js"></script>
        
        <script src="https://cdn.admin.siempregana.net/js/bootstrap.min.js"></script>
        
        <script src="https://cdn.admin.siempregana.net/js/mdb-min.js"></script>
        
        <script src="https://cdn.admin.siempregana.net/lang/datepicker/es-min.js"></script>
        
        <script src="https://cdn.admin.siempregana.net/js/addons/datatables.min.js"></script>
        
        <script src="https://cdn.admin.siempregana.net/js/lightbox-min.js"></script>
        
        <script src="https://cdn.admin.siempregana.net/js/jstree-min.js"></script>
        
        <script src="https://cdn.admin.siempregana.net/js/side_menu-min.js"></script>
        
        <script src="https://cdn.admin.siempregana.net/js/users_quick_modal-min.js"></script>
        
        <script src="https://cdn.admin.siempregana.net/js/dashboard-min.js"></script>
        
        
    </body>
</html>
