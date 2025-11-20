export const SHOW_MESSAGE = 'show_message';
export const HIDE_MESSAGE = 'hide_message';
export const FETCH_START = 'fetch_start';
export const FETCH_SUCCESS = 'fetch_success';
export const FETCH_ERROR = 'fetch_error';
export const FETCH_WARNING = 'fetch_warning';

export const REFRESH_TOKEN = 'refresh_token';
export const SEND_CHANGE_PASSWORD_EMAIL = 'send_change_password_email';
export const SIGNIN_GOOGLE_USER_SUCCESS = 'signin_google_user_success';
export const SIGNIN_FACEBOOK_USER_SUCCESS = 'signin_facebook_user_success';
export const SIGNIN_TWITTER_USER_SUCCESS = 'signin_twitter_user_success';
export const SIGNIN_GITHUB_USER_SUCCESS = 'signin_github_user_SUCCESS';
export const SIGNIN_USER_SUCCESS = 'signin_user_success';
export const SIGNOUT_USER_SUCCESS = 'signout_user_success';

export const SET_DASHBOARD_DATA = 'set_dashboard_data';

export const SET_TASK_CURRENT_USER = 'set_task_current_user';
export const SET_TASKS_DATA = 'set_tasks_data';
export const SET_TASK_LIST_DATA = 'set_task_list_data';
export const ADD_TASK = 'add_task';
export const DELETE_TASK = 'delete_task';
export const UPDATE_TASK = 'update_task';
export const SET_FILTER_DATA = 'set_filter_data';
export const ADD_TASK_LIST = 'add_task_list';
export const UPDATE_TASK_LIST = 'update_task_list';
export const DELETE_TASK_LIST = 'delete_task_list';
export const SET_TASK_DETAIL = 'set_task_detail';
export const SEND_MESSAGE = 'send_message';
export const TOGGLE_SIDEBAR_COLLAPSED = 'toggle_sidebar_collapsed';
export const GET_TASKS_COUNTS = 'get_tasks_counts';

//client
export const ADD_CLIENT = 'add_client_';
export const GET_CLIENTS = 'get_client_';
export const EDIT_CLIENT = 'edit_client_';
export const DELETE_CLIENT = 'del_client_';

//echange locations
export const GET_LOCATIONS = 'locations_';

export const GET_CITY = 'city_';
export const GET_STATUS = 'status_';

//mail app
export const GET_LABELS_LIST = 'get_labels_list';
export const GET_CONNECTIONS_LIST = 'get_connections_list';
export const GET_MAILS_LIST = 'get_mails_list';
export const UPDATE_MAIL_FOLDER = 'update_mail_folder';
export const UPDATE_MAIL_LABEL = 'upade_mail_label';
export const UPDATE_FAVORITE_STATUS = 'update_favorite_status';
export const UPDATE_READ_STATUS = 'update_read_status';
export const UPDATE_IMPORTANT_STATUS = 'update_important_status';
export const COMPOSE_MAIL = 'compose_mail';
export const SET_FILTER_TYPE = 'set_filter_type';
export const GET_SELECTED_MAIL = 'GET_SELECTED_MAIL';
export const UPDATE_SELECTED_MAIL = 'update_selected_mail';
export const NULLIFY_SELECTED_MAIL = 'nullify_selected_mail';
export const REPLY_TO_MAIL = 'reply_to_mail';
export const GET_MAIL_COUNTS = 'get_mail_count';
export const ADD_LABEL = 'add_label';
export const ADD_CONNECTION = 'add_connection';
export const REMOVE_CONNECTION = 'remove_connection';

export const SET_CHAT_USERS = 'set_chat_users';
export const SET_CONTACT_USERS = 'set_contact_users';
export const SET_CURRENT_USER = 'set_current_user';
export const SET_CONVERSATION_DATA = 'set_conversation_data';
export const SEND_NEW_CHAT_MESSAGE = 'send_new_chat_message';
export const SEND_NEW_MEDIA_MESSAGE = 'send_new_media_message';

//Contact App
export const GET_CONTACTS_LIST = 'get_contacts_list';
export const SET_CURRENT_CONTACT = 'set_current_contact';
export const CREATE_CONTACT = 'create_contact';
export const UPDATE_STARRED_STATUS = 'update_starred_status';
export const DELETE_CONTACT = 'delete_contact';
export const UPDATE_CONTACT_LABEL = 'update_contact_label';
export const UPDATE_CONTACT = 'update_contact';
export const GET_CONTACT_COUNTS = 'get_contact_counts';
export const UPDATE_LABEL_ITEM = 'update_label_item';
export const DELETE_LABEL_ITEM = 'delete_label_item';

export const GET_USER_DETAIL = 'get_user_detail';
export const GET_FEED_POSTS = 'get_feed_posts';
export const CREATE_POST = 'create_post';
export const UPDATE_POST = 'update_post';

// Users Module
export const GET_USERS = 'GET_USERS';
export const GET_USERS_SAP = 'GET_USERS_SAP';
export const GET_PROFILES = 'GET_PROFILES';
export const GET_PERMISSION = 'GET_PERMISSION';
export const ADD_USER = 'ADD_USER';
export const ADD_PROFILE = 'ADD_PROFILE';
export const ADD_PERMISSION = 'ADD_PERMISSION';
export const ASSIGN_PERMISSION = 'ASSIGN_PERMISSION';
export const SET_USER_DETAILS = 'SET_USER_DETAILS';
export const EDIT_USER = 'EDIT_USER';
export const DELETE_USER = 'DELETE_USER';
export const DELETE_BULK_USERS = 'DELETE_BULK_USERS';
export const DELETE_BULK_PROFILES = 'DELETE_BULK_PROFILES';

// benefits
 
export const ADD_CATEGORY = 'ADD_CATEGORY'; 

export const GET_BENEFITS = 'GET_BENEFITS';
export const GET_CATEGORY = 'GET_CATEGORY';
export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_CATEGORY_PRODUCTS = 'GET_CATEGORY_PRODUCTS';
 
export const GET_CATEGORY_ID = 'GET_CATEGOR_ID'; 
export const EDIT_CATEGORY = 'EDIT_CATEGORY'; 
export const DELETE_CATEGORY = 'DELETE_CATEGORY'; 

// Auth
export const SEND_FORGET_PASSWORD_EMAIL = 'send_forget_password_email';
export const SET_RESET_PASSWORD_EMAIL = 'set_reset_password_email';
export const SET_RESET_PASSWORD_EMAIL_SUCCESS = 'set_reset_password_email_success';
export const UPDATE_AUTH_USER = 'update_auth_user';
export const UPDATE_LOAD_USER = 'update_load_user';

// Usuarios
export const GET_USUARIOS = 'GET_USUARIOS';
export const GET_USUARIO_BY_ID = 'GET_USUARIO_BY_ID';
export const CLEAR_USUARIO_A_EDITAR = 'CLEAR_USUARIO_A_EDITAR'; 

 

// Categorias
export const GET_CATEGORIAS = 'GET_CATEGORIAS';
export const GET_CATEGORIA_BY_ID = 'GET_CATEGORIA_BY_ID';
export const ADD_CATEGORIA = 'ADD_CATEGORIA';
export const EDIT_CATEGORIA = 'EDIT_CATEGORIA';
export const DELETE_CATEGORIA = 'DELETE_CATEGORIA';

 
export const CLOSE_TERM = 'CLOSE_TERM';
export const GET_FECHAS_CIERRE = 'GET_FECHAS_CIERRE';

// Roles
export const GET_ROLES = 'GET_ROLES';
export const GET_ROLES_BY_ID = 'GET_ROLES_BY_ID';
export const ADD_ROL = 'ADD_ROL';
export const EDIT_ROL = 'EDIT_ROL';

//Secciones
export const GET_SECCIONES = 'GET_SECCIONES';
export const ADD_SECCIONES = 'ADD_SECCIONES';
export const GET_SECCIONES_BY_ID = 'GET_SECCIONES_BY_ID';
export const EDIT_SECCIONES = 'EDIT_SECCIONES';
export const DELETE_SECCION = 'DELETE_SECCION';

// Sectores
export const GET_SECTORES = 'GET_SECTORES';
// Agrega estas constantes al archivo de ActionTypes
export const GET_TIPOS_CARNET = 'GET_TIPOS_CARNET';
export const GET_TIPO_CARNET_BY_ID = 'GET_TIPO_CARNET_BY_ID';
export const ADD_TIPO_CARNET = 'ADD_TIPO_CARNET';
export const EDIT_TIPO_CARNET = 'EDIT_TIPO_CARNET';
export const DELETE_TIPO_CARNET = 'DELETE_TIPO_CARNET';

export const GET_TURNOS = 'GET_TURNOS';
export const GET_TURNO_BY_ID = 'GET_TURNO_BY_ID';
export const ADD_TURNO = 'ADD_TURNO';
export const EDIT_TURNO = 'EDIT_TURNO';
export const DELETE_TURNO = 'DELETE_TURNO';

export const GET_VEHICULOS = 'GET_VEHICULOS';
export const GET_VEHICULO_BY_ID = 'GET_VEHICULO_BY_ID';
export const ADD_VEHICULO = 'ADD_VEHICULO';
export const EDIT_VEHICULO = 'EDIT_VEHICULO';
export const DELETE_VEHICULO = 'DELETE_VEHICULO';

export const GET_SUCURSALES = 'GET_SUCURSALES';
export const GET_SUCURSAL_BY_ID = 'GET_SUCURSAL_BY_ID';
export const ADD_SUCURSAL = 'ADD_SUCURSAL';
export const EDIT_SUCURSAL = 'EDIT_SUCURSAL';
export const DELETE_SUCURSAL = 'DELETE_SUCURSAL';

export const GET_NACIONALIDADES = 'GET_NACIONALIDADES';
export const GET_NACIONALID_BY_ID = 'GET_NACIONALID_BY_ID';
export const ADD_NACIONALIDAD = 'ADD_NACIONALIDAD';
export const EDIT_NACIONALIDAD = 'EDIT_NACIONALIDAD';
export const DELETE_NACIONALIDAD = 'DELETE_NACIONALIDAD';

 
