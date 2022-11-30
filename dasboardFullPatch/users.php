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
        
        <link rel="stylesheet" type='text/css' href="https://cdn.admin.siempregana.net/css/users-min.css">
        
        
        
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
            <div class="container-fluid mb-2 px-1 px-md-3">
                <section>
                    <div class="col-md-12 p-0">
                        <div class="row my-2 my-sm-1 mt-lg-4 mb-lg-3">  
                            <!-- CONDITION OperationAddUser BEGIN -->
                            <div class="col-6 col-xl-3 pl-1 pr-0 text-center">
                                <button class="btn btn-sm btn-danger waves-effect waves-light" id="NewUserButton"><i class="fas fa-user-plus"></i> Nuevo Usuario</button>
                            </div>
                            <!-- CONDITION OperationAddUser END -->
                            <div class="col-6 d-xl-none pr-1 pl-0 text-center">
                                <button class="btn btn-sm btn-danger waves-effect waves-light" id="ShowAffiliatesModal">Estructura</button>
                            </div>  
                        </div>
                        <div class="row">
                            <div class="col-12 col-xl-9">
                                <div class="card">
                                    <div class="card-body p-1 p-lg-3">
                                        <div class="row mb-1 text-center">
                                            <div class="col-6 offset-1 col-sm-4 offset-sm-3 col-md-3 offset-md-0 col-lg-3 pl-md-4">
                                                <div class="md-form font-size-custom2 mt-2 mb-md-1 my-lg-2">
                                                    <input type="text" id="UserSearch" class="form-control search-username" maxlength="16">
                                                    <label for="UserSearch">Nombre de usuario</label>
                                                </div>
                                            </div>
                                            <div class="col-4 col-sm-4 col-md-2 col-lg-2 mt-1 mb-md-0">
                                                <div class="md-form my-2 mt-md-1">
                                                    <button class="btn btn-sm btn-cyan waves-effect waves-light disabled" id="UserSearchButton">Buscar</button>
                                                </div>
                                            </div>
                                            <div class="col-12 col-sm-12 col-md-7 col-lg-7 my-1 mt-md-3 mb-md-1">
                                                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                                    <label class="btn btn-sm btn-cyan waves-effect waves-light px-sm-4 section-select active">
                                                        <input type="radio" name="section_select" id="all" checked>Todos
                                                    </label>
                                                    <label class="btn btn-sm btn-cyan waves-effect waves-light px-sm-4 section-select">
                                                        <input type="radio" name="section_select" id="affiliates">Agentes
                                                    </label>
                                                    <label class="btn btn-sm btn-cyan waves-effect waves-light px-sm-4 section-select">
                                                        <input type="radio" name="section_select" id="players">Jugadores
                                                    </label>
                                                    <label class="btn btn-sm btn-cyan waves-effect waves-light px-sm-4 section-select">
                                                        <input type="radio" name="section_select" id="hidden">Ocultos
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <table id="users" class="table table-striped table-hover table-borderless table-sm w-100" cellspacing="0">
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
                                </div>
                            </div>
                            <div class="d-none d-xl-block col-xl-3 offset-xl-0 pt-4 pt-xl-0 pl-md-0" id="affiliates_tree_container">
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <div class="modal fade left" id="affiliates_tree_modal" tabindex="-1" role="dialog" aria-labelledby="affTreeModal" aria-hidden="true">
                <div class="modal-dialog modal-full-height modal-left" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title w-100" id="AffTreeModal">Listado de Agentes</h4>
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
            <div class="modal fade" id="ModalViewInfo" tabindex="-1" role="dialog" aria-labelledby="ViewInfo" aria-hidden="true">
                <div class="modal-dialog modal-md cascading-modal" role="document">
                    <div class="modal-content">
                        <div class="modal-header text-center gradient-card-header blue-gradient">
                            <h5 class="modal-title w-100 font-weight-bold text-left ml-2" id="ModalViewInfoTitle">Informacion del Usuario</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>              
                        <div class="modal-body">
                            <div class="col text-center" id="ModalViewInfoLoading">
                                <div class="preloader-wrapper big active">
                                    <div class="spinner-layer spinner-green-only">
                                        <div class="circle-clipper left"><div class="circle"></div></div>
                                        <div class="gap-patch"><div class="circle"></div></div>
                                        <div class="circle-clipper right"><div class="circle"></div></div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12 col-sm-6 border-right" id="ModalViewInfoData">
                                    <div class="row">
                                        <div class="col-5 modal-view-info-data mb-2">ID:</div>
                                        <div class="col-7 modal-view-info-content" id="ModalViewInfouserid"></div>
                                    </div>
                                    <div class="row">
                                        <div class="col-5 modal-view-info-data mb-2">Usuario:</div>
                                        <div class="col-7 modal-view-info-content" id="ModalViewInfousername"></div>
                                    </div>
                                    <div class="row">
                                        <div class="col-5 modal-view-info-data mb-2">Padre:</div>
                                        <div class="col-7 modal-view-info-content" id="ModalViewInfoparent"></div>
                                    </div>
                                    <div class="row">
                                        <div class="col-5 modal-view-info-data mb-2">Rol:</div>
                                        <div class="col-7 modal-view-info-content" id="ModalViewInforole_text"></div>
                                    </div>
                                    <div class="row">
                                        <div class="col-5 modal-view-info-data mb-2">Marca:</div>
                                        <div class="col-7 modal-view-info-content" id="ModalViewInfobrand"></div>
                                    </div>
                                    <div class="row">
                                        <div class="col-5 modal-view-info-data mb-2">Agentes:</div>
                                        <div class="col-7 modal-view-info-content">
                                            <a href="" id="ModalViewInfoaffiliatesLink">
                                                <div id="ModalViewInfoaffiliates"></div>
                                            </a>  
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-5 modal-view-info-data mb-2">Jugadores:</div>
                                        <div class="col-7 modal-view-info-content">
                                            <a href="" id="ModalViewInfoplayersLink">  
                                                <div id="ModalViewInfoplayers"></div>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-5 modal-view-info-data mb-2">Creado:</div>
                                        <div class="col-7 modal-view-info-content" id="ModalViewInfocreated"></div>
                                    </div>
                                </div>
                                <div class="col-12 col-sm-6" id="ModalViewInfoAncestry">
                                    <div class="row">
                                        <div class="col-12 mb-1">Estructura:</div>
                                        <div class="col-12" id="ModalViewInfoAncestryData"></div>
                                    </div>
                                </div>
                                <div class="col-12 pt-3 border-top" id="ModalViewInfoblocked">
                                    <div class="row">
                                        <div class="col-4 modal-view-info-data mb-2 pr-0">Detalle de bloqueo:</div>
                                        <div class="col-8 modal-view-info-content" id="ModalViewInfoblocked_reason"></div>
                                    </div>
                                </div>
                            </div>
                        </div>        
                        <div class="modal-footer d-flex justify-content-center py-2">
                            <button type="button" class="btn btn-cyan px-4" data-dismiss="modal">Cerrar</button>
                        </div>      
                    </div>
                </div>
            </div>

            <div class="modal fade" id="ModalEditUser" tabindex="-1" role="dialog" aria-labelledby="EditUser" aria-hidden="true">
                <div class="modal-dialog cascading-modal" role="document">
                    <div class="modal-content">
                        <div class="modal-header text-center gradient-card-header blue-gradient">
                            <h5 class="modal-title w-100 font-weight-bold text-left ml-2"><i class="fas fa-user-edit mr-1"></i>
                                        Editar Usuario</h5>
                        </div>              
                        <div class="modal-c-tabs">
                            <div class="tab-content">
                                <div class="tab-pane fade in show active" id="EditUserTab" role="tabpanel">
                                    <div class="modal-body mx-1 px-1">
                                        <ul class="nav md-pills pills-danger">
                                            <li class="nav-item">
                                                <a class="nav-link" data-toggle="tab" id="EditUserTab2Link" href="#EditUserTab2" role="tab">Datos personales</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link modal-clear-tab active" data-toggle="tab" id="EditUserTab3Link" href="#EditUserTab3" role="tab">Permisos</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" data-toggle="tab" id="EditUserTab4Link" href="#EditUserTab4" role="tab">Comisiones</a>
                                            </li>
                                        </ul>
                                        <div class="tab-content">
                                            <div class="tab-pane fade in show col-sm-8 offset-sm-2" id="EditUserTab2" role="tabpanel">
                                                <div class="md-form mb-5 font-size-custom">
                                                    <i class="far fa-user prefix grey-text"></i>
                                                    <input type="text" id="EditUserName" class="form-control edit-user-input modal-clear-val" autocomplete="off" maxlength="32">
                                                    <label for="EditUserName">Nombre completo</label>
                                                </div>
                                                <div class="md-form mb-5 font-size-custom">
                                                    <i class="far fa-user prefix grey-text"></i>
                                                    <input type="text" id="EditUserPassport" class="form-control edit-user-input modal-clear-val" autocomplete="off" maxlength="32">
                                                    <label for="EditUserPassport">Documento</label>
                                                </div>
                                                <div class="md-form mb-5 font-size-custom">
                                                    <i class="far fa-envelope prefix grey-text"></i>
                                                    <input type="text" id="EditUserEmail" class="form-control edit-user-input modal-clear-val" autocomplete="off" maxlength="32">
                                                    <label for="EditUserEmail">Email</label>
                                                </div>
                                                <div class="md-form mb-5 font-size-custom">
                                                    <i class="fas fa-mobile-alt prefix grey-text"></i>
                                                    <input type="text" id="EditUserPhone" class="form-control edit-user-input modal-clear-val" autocomplete="off" maxlength="16">
                                                    <label for="EditUserPhone">Telefono</label>
                                                </div>
                                            </div>
                                            <div class="tab-pane fade in mb-2 pt-4 show active" id="EditUserTab3" role="tabpanel">
                                                <div class="clear-providers" id="EditUserProviders">
                                                </div>
                                            </div>
                                            <div class="tab-pane fade in show pt-2" id="EditUserTab4" role="tabpanel">
                                                <div class="row pb-1">
                                                    <div class="d-none">Periodo de liquidacion</div>
                                                    <div class="col-6 offset-3 col-md-4 offset-md-4">
                                                        <select class="mdb-select colorful-select dropdown-primary md-form" id="EditUserSettlementPeriod">
                                                            <option value="1">Mensual</option>
                                                            <option value="2" selected>Semanal</option>
                                                        </select>
                                                        <label for="EditUserSettlementPeriod">Liquidar automaticamente</label>
                                                    </div>
                                                </div>
                                                <div class="clear-providers" id="EditUserCommissions"></div>
                                            </div>
                                        </div>
                                    </div>        
                                    <div class="font-size-custom modal-clear-hide text-center mb-4" id="EditUserError"></div>
                                    <div class="col modal-clear-hide text-center text-center mb-4" id="EditUserLoading">
                                        <div class="preloader-wrapper small active">
                                            <div class="spinner-layer spinner-green-only">
                                                <div class="circle-clipper left"><div class="circle"></div></div>
                                                <div class="gap-patch"><div class="circle"></div></div>
                                                <div class="circle-clipper right"><div class="circle"></div></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer d-flex justify-content-center py-2">
                                        <input type="hidden" class="modal-clear-val" id="EditUserId">
                                        <button type="button" class="btn btn-cyan px-4" id="ModalEditUserSubmit">Aceptar</button>
                                    </div>      
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="ModalEditUserConfirm" tabindex="-1" role="dialog" aria-labelledby="EditUserConfirm" aria-modal="true">
                <div class="modal-dialog modal-sm cascading-modal modal-notify modal-warning" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h6 class="modal-title w-100 font-weight-bold text-left ml-2" id="EditUserConfirmTitleEnable">Habilitar Permiso</h6>
                            <h6 class="modal-title w-100 font-weight-bold text-left ml-2" id="EditUserConfirmTitleDisable">Deshabilitar Permiso</h6>
                        </div>
                        <div class="modal-body">
                            <div class="text-center">
                                <p>Se modifica el permiso para</p>
                            </div>
                            <div class="edit-user-confirm-children font-size-custom pt-1">
                                <fieldset class="form-check pl-1">
                                    <input class="form-check-input" name="EditUserConfirmChildren" type="radio" data-id="1" id="EditUserConfirmChildrenAffiliate" checked="checked">
                                    <label class="form-check-label" for="EditUserConfirmChildrenAffiliate">Agente</label>
                                </fieldset>
                                <fieldset class="form-check pl-1">
                                    <input class="form-check-input" name="EditUserConfirmChildren" type="radio" data-id="2" id="EditUserConfirmChildrenPlayers">
                                    <label class="form-check-label" for="EditUserConfirmChildrenPlayers">Agente y Jugadores directos</label>
                                </fieldset>
                                <fieldset class="form-check pl-1">
                                    <input class="form-check-input" name="EditUserConfirmChildren" type="radio" data-id="3" id="EditUserConfirmChildrenAll">
                                    <label class="form-check-label" for="EditUserConfirmChildrenAll">Todos (Agente, SubAgentes y Jugadores)</label>
                                </fieldset>
                            </div>
                            <div class="edit-user-confirm-notify font-size-custom pt-3 text-center">
                                Todos los SubAgentes y Jugadores
                            </div>
                            <div class="col modal-clear-hide text-center text-center mb-4" id="EditUserConfirmLoading">
                                <div class="preloader-wrapper small active">
                                    <div class="spinner-layer spinner-green-only">
                                        <div class="circle-clipper left"><div class="circle"></div></div>
                                        <div class="gap-patch"><div class="circle"></div></div>
                                        <div class="circle-clipper right"><div class="circle"></div></div>
                                    </div>
                                </div>
                                <div class="text-center font-size-custom">
                                    Por favor aguarde. Esta modificacion puede demorar algunos instantes.
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer justify-content-center">
                            <input type="hidden" class="modal-clear-val" id="EditUserConfirmProviderId">
                            <input type="hidden" class="modal-clear-val" id="EditUserConfirmProviderStatus">
                            <button type="button" class="btn btn-sm btn-outline-warning waves-effect" data-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-sm btn-warning waves-effect waves-light" id="ModalEditUserConfirmSubmit">Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="ModalLockUserConfirm" tabindex="-1" role="dialog" aria-labelledby="LockUserConfirm" aria-modal="true">
                <div class="modal-dialog modal-sm cascading-modal modal-notify modal-warning" role="document">
                    <div class="modal-content">
                        <div class="modal-header text-center gradient-card-header blue-gradient">
                            <h6 class="modal-title w-100 font-weight-bold text-left ml-2">Bloquear usuario</h6>
                        </div>
                        <div class="modal-body">
                            <div class="md-form font-size-custom pt-1">
                                <input type="hidden" id="LockUserConfirmId" class="modal-clear-val">
                                <input type="text" id="LockUserConfirmReason" class="form-control modal-clear-val" maxlength="128">
                                <label for="LockUserConfirmReason">Motivo de bloqueo (opcional)</label>
                            </div>
                        </div>
                        <div class="modal-footer justify-content-center">
                            <button type="button" class="btn btn-sm btn-outline-cyan waves-effect" data-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-sm btn-cyan waves-effect waves-light" id="ModalLockUserConfirmSubmit">Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="ModalUnlockUserConfirm" tabindex="-1" role="dialog" aria-labelledby="UnlockUserConfirm" aria-modal="true">
                <div class="modal-dialog modal-sm cascading-modal modal-notify modal-warning" role="document">
                    <div class="modal-content">
                        <div class="modal-header text-center gradient-card-header blue-gradient">
                            <h6 class="modal-title w-100 font-weight-bold text-left ml-2">Desbloquear usuario</h6>
                        </div>
                        <div class="modal-body">
                            <div>Se especifico un motivo de bloqueo</div>
                            <div class="font-italic font-size-custom2 mt-3" id="UnlockUserConfirmReason"></div>
                            <input type="hidden" id="UnlockUserConfirmId" class="modal-clear-val">
                        </div>
                        <div class="modal-footer justify-content-center">
                            <button type="button" class="btn btn-sm btn-outline-cyan waves-effect" data-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-sm btn-cyan waves-effect waves-light" id="ModalUnlockUserConfirmSubmit">Aceptar</button>
                        </div>
                    </div>
                </div>
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
            document.body.dataset.base_server_path='';document.body.dataset.brand_id='13';document.body.dataset.brand_support='1';document.body.dataset.cdn_url='https://cdn.admin.siempregana.net/';document.body.dataset.current_language='es';document.body.dataset.current_user_id='26270';document.body.dataset.current_username='pastblind1';document.body.dataset.datatable_title_action='Accion';document.body.dataset.datatable_title_agent='Dispositivo';document.body.dataset.datatable_title_date='Fecha';document.body.dataset.datatable_title_ip='Direccion IP';document.body.dataset.force_change_passwd='-1';document.body.dataset.is_mobile='';document.body.dataset.item_select='Seleccionar';document.body.dataset.number_format='1';document.body.dataset.room_id='10';document.body.dataset.session_token='b9ca0a9d7d5b255312def94b17f61b5c914089c6295b714777c2299170a0d3ac';document.body.dataset.site_start='2019-07-01';document.body.dataset.support_new_ticket='Contactar a Soporte';document.body.dataset.support_nickname='Soporte';document.body.dataset.users_notification='Notificacion';document.body.dataset.sports_bet_print='0';document.body.dataset.site_url='admin.play.siempregana.net';document.body.dataset.rtoken='https://play.siempregana.net/?rtoken=HYHEM';document.body.dataset.section='all';document.body.dataset.username_search='';document.body.dataset.users_modal_credit_add_title='Cargar Fichas';document.body.dataset.users_modal_credit_deduct_title='Descargar Fichas';document.body.dataset.users_modal_credit_finance_collect_title='Registrar Cobrado';document.body.dataset.users_modal_credit_finance_payout_title='Registrar Pagado';document.body.dataset.datatable_title_username='Usuario';document.body.dataset.datatable_title_player='Jugador';document.body.dataset.datatable_title_credits='Fichas';document.body.dataset.datatable_title_actions='Acciones';document.body.dataset.datatable_title_actions2='Mas acciones';document.body.dataset.multi_select_all='Todos';
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
        
        <script src="https://cdn.admin.siempregana.net/js/users_quick_modal-min.js"></script>
        
        <script src="https://cdn.admin.siempregana.net/js/users-min.js"></script>
        
        
    </body>
</html>
