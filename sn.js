"use strict";

window.onload = function () {
    document.getElementById('startup').innerHTML = start();
    if (document.cookie !== "") {
        document.getElementById('in').style.display = "none";
        document.getElementById('up').style.display = "none";
        document.getElementById('a').style.display = "block";
        document.getElementById('b').style.display = "block";
        document.getElementById('c').style.display = "block";
        document.getElementById('d').style.display = "block";
        document.getElementById('e').style.display = "block";
        document.getElementById('aftere').style.display = "block";
        document.getElementById('f').style.display = "none";
        loggedin = "true";
        logout_button();
        info_button();
        users_button();
        post_button();
        profile_button();
        search_button();
    }
};
var loggedin = "false";

function start() {
    return ('<form class="form">' +
        '<div><button type="button" class="button" id="in" style="border: none;" onclick="login()">Log In</button></div>' +
        '<div><button type="button" class="button" id="up" style="border: none;" onclick="signup()">Sign Up</button></div>' +
        '</form>');
}


function signup() {
    document.getElementById('a').style.display = "block";
    var addsignup = document.getElementById('a');
    addsignup.innerHTML = generateForm(user_data);
}

//ta patterns de doulevoun swsta
function validate_everything() {
    var response = "";
    if (!document.getElementById("username").checkValidity()) {
        response += "Username is wrong\n";
    }
    if (!document.getElementById("email").checkValidity()) {
        response += "E-Mail is wrong\n";
    }
    if (!document.getElementById("password").checkValidity()) {
        response += "Password is wrong\n";
    }
    if (!document.getElementById("passwordconfirm").checkValidity()) {
        response += "Password confirmation is wrong\n";
    }
    if (!document.getElementById("name").checkValidity()) {
        response += "Name is wrong\n";
    }
    if (!document.getElementById("surname").checkValidity()) {
        response += "Surname is wrong\n";
    }
    if (!document.getElementById("birthday").checkValidity()) {
        response += "Birthday is wrong\n";
    }
    if (!document.getElementById("town").checkValidity()) {
        response += "Town is wrong\n";
    }
    if (!document.getElementById("address").checkValidity()) {
        response += "Address is wrong\n";
    }
    if (!document.getElementById("work").checkValidity()) {
        response += "Work is wrong\n";
    }
    if (!document.getElementById("interests").checkValidity()) {
        response += "Interests are wrong\n";
    }
    if (!document.getElementById("bio").checkValidity()) {
        response += "Bio is wrong\n";
    }

    function validateGender() {
        var radio = document.getElementsByName("gender");
        if ((radio[0].checked === false) && (radio[1].checked === false) && (radio[2].checked === false)) {
            return "Gender is wrong\n";
        } else {
            return "";
        }
    }
    response += validateGender();
    if (response !== "") {
        alert(response);
    } else {
        register_user(user_data);
    }
}

function getGender(gender = null) {
    var radio = document.getElementsByName("gender");
    var i = 0;
    while ((i < 3) && (gender == null)) {
        if (radio[i].checked) {
            gender = radio[i].value;
        }
        i++;
    }
    return gender;
}

var user_data = {
    userName: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    country: "",
    town: "",
    address: "",
    occupation: "",
    interests: "",
    info: "",
    gender: ""
};


function register_user(user) {
    user.userName = document.getElementById("username").value;
    user.email = document.getElementById("email").value;
    user.password = document.getElementById("password").value;
    user.firstName = document.getElementById("name").value;
    user.lastName = document.getElementById("surname").value;
    user.birthDate = document.getElementById("birthday").value;
    user.country = document.getElementById("country").value;
    user.town = document.getElementById("town").value;
    user.address = document.getElementById("address").value;
    user.occupation = document.getElementById("work").value;
    user.interests = document.getElementById("interests").value;
    user.info = document.getElementById("bio").value;
    user.gender = getGender();

    var xhr = new XMLHttpRequest();
    xhr.open('POST', "/gachimuchi_war_exploded/users?signed=" + loggedin);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(user));
    xhr.onload = function () {
        //console.log(xhr.response);
        if (xhr.status == 400) {
            alert(xhr.responseText);
        } else if (xhr.status == 200) {
            document.getElementById('in').style.display = "none";
            document.getElementById('up').style.display = "none";
            document.getElementById('a').style.display = "block";
            document.getElementById('b').style.display = "block";
            document.getElementById('c').style.display = "block";
            document.getElementById('d').style.display = "block";
            document.getElementById('e').style.display = "block";
            document.getElementById('aftere').style.display = "block";
            document.getElementById('f').style.display = "block";

            loggedin = "true";
            logout_button();
            info_button();
            users_button();
            post_button();
            search_button();
        } else {
            alert("There was an error with your registration");
        }
    };
    xhr.onerror = function () {
        console.log("ERROR");
    };

}

function showUserForm(user) {
    document.getElementById('a').style.display = "none";
    document.getElementById('b').style.display = "none";
    document.getElementById('c').style.display = "none";
    document.getElementById('d').style.display = "none";
    document.getElementById('e').style.display = "none";
    document.getElementById('aftere').style.display = "block";
    document.getElementById('f').style.display = "block";

    var addsignup = document.getElementById('f');
    addsignup.innerHTML = generateForm(user);
}

//den emfanizei info an o user mpainei me cookies xwris login
function userinfo(user) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', "/gachimuchi_war_exploded/users?getinfo=true&user=" + document.cookie, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    //user_data = JSON.parse(xhr.responseText);
    //console.log(user_data);


    //user = xhr.responseText;

    var newinfo =

        '<div class="info">' +
        '<dl>' +
        '<dt>Username:</dt>' +
        '<dd>' + user.userName + '</dd>' +

        '<dt>E-Mail:</dt>' +
        '<dd>' + user.email + '</dd>' +

        '<dt>Password:</dt>' +
        '<dd>' + user.password + '</dd>' +

        '<dt>Name:</dt>' +
        '<dd>' + user.firstName + '</dd>' +

        '<dt>Surname:</dt>' +
        '<dd>' + user.lastName + '</dd>' +

        '<dt>Birthday:</dt>' +
        '<dd>' + user.birthDate + '</dd>' +

        '<dt>Gender:</dt>' +
        '<dd>' + user.gender + '</dd>' +

        '<dt>Country:</dt>' +
        '<dd>' + user.country + '</dd>' +

        '<dt>Town:</dt>' +
        '<dd>' + user.town + '</dd>' +

        '<dt>Address:</dt>' +
        '<dd>' + user.address + '</dd>' +

        '<dt>Work:</dt>' +
        '<dd>' + user.occupation + '</dd>' +

        '<dt>Interests:</dt>' +
        '<dd>' + user.interests + '</dd>' +

        '<dt>Bio:</dt>' +
        '<dd>' + user.info + '</dd>' +

        '</dl>' +
        '</div>';
    var info = document.getElementById('f');
    info.innerHTML = newinfo;
    document.getElementById('f').style.display = "block";
    info.appendChild(change_btn);
}

function setGender(gender) {
    var radio = document.getElementsByName("gender");
    for (let i = 0; i < 3; i++) {
        radio[i].checked = gender === radio[i].value;
        radio[i].disabled = true;
    }
}

var change_btn = document.createElement('button');
change_btn.type = "button";
change_btn.id = 'change_button';
change_btn.style = 'border: none';
change_btn.innerHTML = "Change Information";
change_btn.addEventListener('click', () => {
    document.getElementById('f').style.display = "none";
    showUserForm(user_data);
    document.getElementById("username").disabled = true;
    document.getElementById("email").disabled = true;
    setGender(user_data.gender);
});

function generateForm(user) {
    return (
        '<form class="form">' +
        '<div class="input_field">' +
        '<label>* Username:</label>' +
        '<input type="text" class="input" id="username" value="' + user.userName + '" name="username" pattern="[a-zA-Z0-9]+" minlength="8" title="Your username must be at least 8 characters. ' +
        'Only letters and numbers allowed." required>' +
        '</div>' +

        '<div class="input_field">' +
        '<label>* E-Mail:</label>' +
        '<input type="email" class="input" value="' + user.email + '" id="email" required>' +
        '</div>' +
        '<div class="input_field">' +
        '<label>* Password:</label>' +
        '<input type="password" class="input" id="password" minlength="8" maxlength="10"' +
        'title="Your password should contain at least one character, one number' +
        ' and one of the following symbols: !@#$%^&*()|{}.,_=+" required>' +
        '</div>' +

        '<div class="input_field">' +
        '<label>* Password Confirmation:</label>' +
        '<input type="password" class="input" id="passwordconfirm" minlength="8" maxlength="10"' +
        'title="Your password should contain at least one character, one number ' +
        ' and one of the following symbols: @$!%*#?&" onkeyup="validateForm(); return false;" required>' +
        '<span id="confirmMessage" class="confirmMessage"></span>' +

        '</div>' +

        '<div class="input_field">' +
        '<label>* Name:</label>' +
        '<input type="text" class="input" value="' + user.firstName + '" id="name" minlength="3" maxlength="15" title="Invalid input" required>' +
        '</div>' +
        '<div class="input_field">' +
        '<label>* Surname:</label>' +
        '<input type="text" class="input" value="' + user.lastName + '" id="surname" minlength="3" maxlength="15" title="Invalid input" required>' +
        '</div>' +

        '<div class="input_field">' +
        '<label>* Birthday:</label>' +
        '<input type="date" class="input" value="' + user.birthDate + '" id="birthday" max="2007-10-16" required>' +
        '</div>' +
        '<div class="input_field">' +
        '<label>&nbsp;&nbsp;Gender:</label>' +
        '<div id="radio">' +
        '<input type="radio" name="gender" value="MALE"> Male ' +
        '<input type="radio" name="gender" value="FEMALE"> Female ' +
        '<input type="radio" name="gender" value="UNKNOWN"> Other ' +
        '</div>' +
        '</div>' +

        '<div class="input_field">' +
        '<label>* Country:</label>' +
        '<select name="country" id="country" value="' + user.country + '" class="input" onblur="checkLoc()" required>' +
        '<option value="GR" selected>Greece</option>' +
        '<option value="AF">Afghanistan</option>' +
        ' <option value="AX">&Aring;land Islands</option>' +
        ' <option value="AL">Albania</option>' +
        ' <option value="DZ">Algeria</option>' +
        ' <option value="AS">American Samoa</option>' +
        ' <option value="AD">Andorra</option>' +
        ' <option value="AO">Angola</option>' +
        ' <option value="AI">Anguilla</option>' +
        ' <option value="AQ">Antarctica</option>' +
        ' <option value="AG">Antigua and Barbuda</option>' +
        ' <option value="AR">Argentina</option>' +
        ' <option value="AM">Armenia</option>' +
        ' <option value="AW">Aruba</option>' +
        ' <option value="AU">Australia</option>' +
        ' <option value="AT">Austria</option>' +
        ' <option value="AZ">Azerbaijan</option>' +
        ' <option value="BS">Bahamas</option>' +
        ' <option value="BH">Bahrain</option>' +
        ' <option value="BD">Bangladesh</option>' +
        ' <option value="BB">Barbados</option>' +
        ' <option value="BY">Belarus</option>' +
        ' <option value="BE">Belgium</option>' +
        ' <option value="BZ">Belize</option>' +
        ' <option value="BJ">Benin</option>' +
        ' <option value="BM">Bermuda</option>' +
        ' <option value="BT">Bhutan</option>' +
        ' <option value="BO">Bolivia, Plurinational State of</option>' +
        ' <option value="BA">Bosnia and Herzegovina</option>' +
        ' <option value="BW">Botswana</option>' +
        ' <option value="BV">Bouvet Island</option>' +
        ' <option value="BR">Brazil</option>' +
        ' <option value="IO">British Indian Ocean Territory</option>' +
        ' <option value="BN">Brunei Darussalam</option>' +
        ' <option value="BG">Bulgaria</option>' +
        ' <option value="BF">Burkina Faso</option>' +
        ' <option value="BI">Burundi</option>' +
        ' <option value="KH">Cambodia</option>' +
        ' <option value="CM">Cameroon</option>' +
        '<option value="CA">Canada</option>' +
        ' <option value="CV">Cape Verde</option>' +
        ' <option value="KY">Cayman Islands</option>' +
        ' <option value="CF">Central African Republic</option>' +
        ' <option value="TD">Chad</option>' +
        ' <option value="CL">Chile</option>' +
        ' <option value="CN">China</option>' +
        ' <option value="CX">Christmas Island</option>' +
        ' <option value="CC">Cocos (Keeling) Islands</option>' +
        ' <option value="CO">Colombia</option>' +
        ' <option value="KM">Comoros</option>' +
        ' <option value="CG">Congo</option>' +
        ' <option value="CD">Congo, the Democratic Republic of the</option>' +
        ' <option value="CK">Cook Islands</option>' +
        ' <option value="CR">Costa Rica</option>' +
        ' <option value="CI">C&ocirc;te d\'Ivoire</option > ' +
        ' <option value="HR">Croatia</option>' +
        '<option value="CU">Cuba</option>' +
        '<option value="CY">Cyprus</option>' +
        '<option value="CZ">Czech Republic</option>' +
        '<option value="DK">Denmark</option>' +
        '<option value="DJ">Djibouti</option>' +
        '<option value="DM">Dominica</option>' +
        '<option value="DO">Dominican Republic</option>' +
        '<option value="EC">Ecuador</option>' +
        '<option value="EG">Egypt</option>' +
        '<option value="SV">El Salvador</option>' +
        '<option value="GQ">Equatorial Guinea</option>' +
        '<option value="ER">Eritrea</option>' +
        '<option value="EE">Estonia</option>' +
        '<option value="ET">Ethiopia</option>' +
        '<option value="FK">Falkland Islands (Malvinas)</option>' +
        '<option value="FO">Faroe Islands</option>' +
        '<option value="FJ">Fiji</option>' +
        '<option value="FI">Finland</option>' +
        '<option value="FR">France</option>' +
        '<option value="GF">French Guiana</option>' +
        '<option value="PF">French Polynesia</option>' +
        '<option value="TF">French Southern Territories</option>' +
        '<option value="GA">Gabon</option>' +
        '<option value="GM">Gambia</option>' +
        '<option value="GE">Georgia</option>' +
        '<option value="DE">Germany</option>' +
        '<option value="GH">Ghana</option>' +
        '<option value="GI">Gibraltar</option>' +
        '<option value="GR">Greece</option>' +
        '<option value="GL">Greenland</option>' +
        '<option value="GD">Grenada</option>' +
        '<option value="GP">Guadeloupe</option>' +
        '<option value="GU">Guam</option>' +
        '<option value="GT">Guatemala</option>' +
        '<option value="GG">Guernsey</option>' +
        '<option value="GN">Guinea</option>' +
        '<option value="GW">Guinea-Bissau</option>' +
        '<option value="GY">Guyana</option>' +
        '<option value="HT">Haiti</option>' +
        '<option value="HM">Heard Island and McDonald Islands</option>' +
        '<option value="VA">Holy See (Vatican City State)</option>' +
        '<option value="HN">Honduras</option>' +
        '<option value="HK">Hong Kong</option>' +
        '<option value="HU">Hungary</option>' +
        '<option value="IS">Iceland</option>' +
        '<option value="IN">India</option>' +
        '<option value="ID">Indonesia</option>' +
        '<option value="IR">Iran, Islamic Republic of</option>' +
        '<option value="IQ">Iraq</option>' +
        '<option value="IE">Ireland</option>' +
        '<option value="IM">Isle of Man</option>' +
        '<option value="IL">Israel</option>' +
        '<option value="IT">Italy</option>' +
        '<option value="JM">Jamaica</option>' +
        '<option value="JP">Japan</option>' +
        '<option value="JE">Jersey</option>' +
        '<option value="JO">Jordan</option>' +
        '<option value="KZ">Kazakhstan</option>' +
        '<option value="KE">Kenya</option>' +
        '<option value="KI">Kiribati</option>' +
        '<option value="KP">Korea, Democratic People\'s Republic of</option>' +
        '<option value="KR">Korea, Republic of</option>' +
        '<option value="KW">Kuwait</option>' +
        '<option value="KG">Kyrgyzstan</option>' +
        '<option value="LA">Lao People\'s Democratic Republic</option>' +
        '<option value="LV">Latvia</option>' +
        '<option value="LB">Lebanon</option>' +
        '<option value="LS">Lesotho</option>' +
        '<option value="LR">Liberia</option>' +
        '<option value="LY">Libyan Arab Jamahiriya</option>' +
        '<option value="LI">Liechtenstein</option>' +
        '<option value="LT">Lithuania</option>' +
        '<option value="LU">Luxembourg</option>' +
        '<option value="MO">Macao</option>' +
        '<option value="MK">Macedonia, the former Yugoslav Republic of</option>' +
        '<option value="MG">Madagascar</option>' +
        '<option value="MW">Malawi</option>' +
        '<option value="MY">Malaysia</option>' +
        '<option value="MV">Maldives</option>' +
        '<option value="ML">Mali</option>' +
        '<option value="MT">Malta</option>' +
        '<option value="MH">Marshall Islands</option>' +
        '<option value="MQ">Martinique</option>' +
        '<option value="MR">Mauritania</option>' +
        '<option value="MU">Mauritius</option>' +
        '<option value="YT">Mayotte</option>' +
        '<option value="MX">Mexico</option>' +
        '<option value="FM">Micronesia, Federated States of</option>' +
        '<option value="MD">Moldova, Republic of</option>' +
        '<option value="MC">Monaco</option>' +
        '<option value="MN">Mongolia</option>' +
        '<option value="ME">Montenegro</option>' +
        '<option value="MS">Montserrat</option>' +
        '<option value="MA">Morocco</option>' +
        '<option value="MZ">Mozambique</option>' +
        '<option value="MM">Myanmar</option>' +
        '<option value="NA">Namibia</option>' +
        '<option value="NR">Nauru</option>' +
        '<option value="NP">Nepal</option>' +
        '<option value="NL">Netherlands</option>' +
        '<option value="AN">Netherlands Antilles</option>' +
        '<option value="NC">New Caledonia</option>' +
        '<option value="NZ">New Zealand</option>' +
        '<option value="NI">Nicaragua</option>' +
        '<option value="NE">Niger</option>' +
        '<option value="NG">Nigeria</option>' +
        '<option value="NU">Niue</option>' +
        '<option value="NF">Norfolk Island</option>' +
        '<option value="MP">Northern Mariana Islands</option>' +
        '<option value="NO">Norway</option>' +
        '<option value="OM">Oman</option>' +
        '<option value="PK">Pakistan</option>' +
        '<option value="PW">Palau</option>' +
        '<option value="PS">Palestinian Territory, Occupied</option>' +
        '<option value="PA">Panama</option>' +
        '<option value="PG">Papua New Guinea</option>' +
        '<option value="PY">Paraguay</option>' +
        '<option value="PE">Peru</option>' +
        '<option value="PH">Philippines</option>' +
        '<option value="PN">Pitcairn</option>' +
        '<option value="PL">Poland</option>' +
        '<option value="PT">Portugal</option>' +
        ' <option value="PR">Puerto Rico</option>' +
        '<option value="QA">Qatar</option>' +
        '<option value="RE">R&eacute;union</option>' +
        '<option value="RO">Romania</option>' +
        ' <option value="RU">Russian Federation</option>' +
        ' <option value="RW">Rwanda</option>' +
        ' <option value="BL">Saint Barth&eacute;lemy</option>' +
        '  <option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>' +
        ' <option value="KN">Saint Kitts and Nevis</option>' +
        ' <option value="LC">Saint Lucia</option>' +
        '  <option value="MF">Saint Martin (French part)</option>' +
        ' <option value="PM">Saint Pierre and Miquelon</option>' +
        ' <option value="VC">Saint Vincent and the Grenadines</option>' +
        ' <option value="WS">Samoa</option>' +
        ' <option value="SM">San Marino</option>' +
        '  <option value="ST">Sao Tome and Principe</option>' +
        '  <option value="SA">Saudi Arabia</option>' +
        ' <option value="SN">Senegal</option>' +
        '<option value="RS">Serbia</option>' +
        '<option value="SC">Seychelles</option>' +
        '<option value="SL">Sierra Leone</option>' +
        '<option value="SG">Singapore</option>' +
        '<option value="SK">Slovakia</option>' +
        ' <option value="SI">Slovenia</option>' +
        '<option value="SB">Solomon Islands</option>' +
        '<option value="SO">Somalia</option>' +
        '<option value="ZA">South Africa</option>' +
        '<option value="GS">South Georgia and the South Sandwich Islands</option>' +
        '<option value="ES">Spain</option>' +
        '<option value="LK">Sri Lanka</option>' +
        '<option value="SD">Sudan</option>' +
        '<option value="SR">Suriname</option>' +
        '<option value="SJ">Svalbard and Jan Mayen</option>' +
        ' <option value="SZ">Swaziland</option>' +
        ' <option value="SE">Sweden</option>' +
        ' <option value="CH">Switzerland</option>' +
        ' <option value="SY">Syrian Arab Republic</option>' +
        '<option value="TW">Taiwan, Province of China</option>' +
        '<option value="TJ">Tajikistan</option>' +
        '<option value="TZ">Tanzania, United Republic of</option>' +
        '<option value="TH">Thailand</option>' +
        '<option value="TL">Timor-Leste</option>' +
        '<option value="TG">Togo</option>' +
        '<option value="TK">Tokelau</option>' +
        ' <option value="TO">Tonga</option>' +
        '<option value="TT">Trinidad and Tobago</option>' +
        '<option value="TN">Tunisia</option>' +
        '<option value="TR">Turkey</option>' +
        '<option value="TM">Turkmenistan</option>' +
        '<option value="TC">Turks and Caicos Islands</option>' +
        '<option value="TV">Tuvalu</option>' +
        '<option value="UG">Uganda</option>' +
        '<option value="UA">Ukraine</option>' +
        '<option value="AE">United Arab Emirates</option>' +
        '<option value="GB">United Kingdom</option>' +
        '<option value="US">United States</option>' +
        '<option value="UM">United States Minor Outlying Islands</option>' +
        '<option value="UY">Uruguay</option>' +
        '<option value="UZ">Uzbekistan</option>' +
        '<option value="VU">Vanuatu</option>' +
        '<option value="VE">Venezuela, Bolivarian Republic of</option>' +
        '<option value="VN">Viet Nam</option>' +
        '<option value="VG">Virgin Islands, British</option>' +
        '<option value="VI">Virgin Islands, U.S.</option>' +
        '<option value="WF">Wallis and Futuna</option>' +
        '<option value="EH">Western Sahara</option>' +
        '<option value="YE">Yemen</option>' +
        '<option value="ZM">Zambia</option>' +
        '<option value="ZW">Zimbabwe</option>' +
        '</select >' +
        '</div >' +

        '<div class="input_field">' +
        '<label>* Town:</label>' +
        '<input type="text" class="input" value="' + user.town + '" id="town" minlength="3" maxlength="20" pattern="[A-Za-zΑ-Ωα-ω]{3,20}" onblur="checkLoc()" required>' +
        '</div>' +
        '<div class="input_field">' +
        '<label>&nbsp;&nbsp;Address:</label>' +
        '<input type="text" class="input" value="' + user.address + '" id="address" onblur="checkLoc()">' +
        '<span id="confirmaddress" class="confirmaddress"></span>' +
        '</div>' +
        '<div id="autoloc_fail"></div>' +
        '<div class="map_btn">' +
        '<script src="http://www.openlayers.org/api/OpenLayers.js"></script>' +
        '<input id="map" class="map_button" type="button" value="Map" onclick="openMap()" style="border: none;" >' +
        '</div>' +
        '<div id="map_placement"></div>' +

        '<div class="autoloc_btn">' +
        '<input id="autolocbtn" class="autoloc_button" type="button" value="Autofill Address" onclick="autoloc()" style="border: none;" >' +
        ' </div>' +


        '<div class="input_field">' +
        ' <label>* Work:</label>' +
        ' <input type="text" class="input" value="' + user.occupation + '" id="work" minlength="3" maxlength="20" required>' +
        '  </div>' +
        ' <div class="input_field">' +
        '  <label>Interests:</label>' +
        '<textarea style="resize:none" id="interests" rows="3" cols="50" maxlength="100">' + user.interests + '</textarea>' +
        '</div>' +
        '<div class="input_field">' +
        ' <label>General Information:</label>' +
        '<textarea style="resize:none" id="bio" rows="10" cols="50" maxlength="500">' + user.interests + '</textarea>' +
        '</div>' +

        '<div class="submit_button">' +
        '<input type="button" value="Submit" class="button" style="border: none;" onclick="validate_everything();">' +
        '</div>' +

        '</form>'
    );
}

function login() {
    var addlogin = document.getElementById('a');
    document.getElementById('a').style.display = "block";
    addlogin.innerHTML = generateLogin();
}

function generateLogin() {
    return (
        '<form class="form">' +
        '<div class="input_field">' +
        '<label>* Username:</label>' +
        '<input type="text" class="input" id="username" name="username" pattern="[a-zA-Z0-9]+" minlength="8" title="Your username must be at least 8 characters. ' +
        'Only letters and numbers allowed." required>' +
        '</div>' +
        '<div class="input_field">' +
        '<label>* Password:</label>' +
        '<input type="password" class="input" id="password" minlength="8" maxlength="10"' +
        'title="Your password should contain at least one character, one number' +
        'and one of the following symbols: !@#$%^&*()|{}.,_=+" required>' +
        '</div>' +
        '<div class="submit_button">' +
        '<input type="button" value="Submit" class="button" style="border: none;" onclick="validate_login();">' +
        '</div>' +
        '</form>'
    );
}

function logout_form() {
    return (
        '<form class="form">' +
        '<div id="logout">' +
        '<input type="button" value="Log Out" id="btn" style="border: none;" onclick="logout();">' +
        '</div>' +
        '</form>'
    );
}

function logout_button() {
    document.getElementById('a').style.display = "block";
    document.getElementById('a').innerHTML = logout_form();
}

function logout() {
    loggedin = "false";
    user_data = {};

    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', "/gachimuchi_war_exploded/login", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send();

    document.getElementById('in').style.display = "block";
    document.getElementById('up').style.display = "block";
    document.getElementById('a').style.display = "none";
    document.getElementById('b').style.display = "none";
    document.getElementById('c').style.display = "none";
    document.getElementById('d').style.display = "none";
    document.getElementById('e').style.display = "none";
    document.getElementById('aftere').style.display = "none";

    document.getElementById('f').style.display = "none";

}

function info_form() {
    return (
        '<form class="form">' +
        '<div id="personal">' +
        '<input type="button" value="View Personal Information" id="btn" style="border: none;" onclick="userinfo(user_data);">' +
        '</div>' +
        '</form>'
    );
}

function info_button() {
    document.getElementById('b').style.display = "block";
    document.getElementById('b').innerHTML = info_form();
}

function users_form() {
    return (
        '<form class="form">' +
        '<div id="others">' +
        '<input type="button" value="View all users" id="btn" style="border: none;" onclick="view_users();">' +
        '</div>' +
        '</form>'
    );
}

function users_button() {
    document.getElementById('c').style.display = "block";
    document.getElementById('c').innerHTML = users_form();
}

function view_users() {
    logout_button();
    info_button();

    var xhr = new XMLHttpRequest();
    xhr.open('GET', "/gachimuchi_war_exploded/users?getinfo=false", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    xhr.onload = function () {
        //console.log(xhr.response);
        if (xhr.status !== 200) {
            alert("An error occured");
        } else {
            document.getElementById('f').style.display = "block";
            return document.getElementById('f').innerHTML = xhr.responseText;
        }
    };
    xhr.onerror = function () {
        console.log("ERROR");
    };
}

function submit_post() {
    var userName = user_data.userName;
    var description = document.getElementById('post_txt').value;
    var latitude;
    var longtitude;
    navigator.geolocation.getCurrentPosition(our_position);

    function our_position(position) {
        latitude = position.coords.latitude;
        longtitude = position.coords.longitude;
    }

    var post_image = document.getElementById('file');

    var post = {
        userName: user_data.userName,
        description: description,
        resourceURL: null,
        imageURL: null,
        imageBase64: null,
        latitude: latitude,
        longtitude: longtitude,
        createdAt: null
    };

    var xhr = new XMLHttpRequest();
    xhr.open('POST', "/gachimuchi_war_exploded/posts?newpost=true", true);

    xhr.setRequestHeader("Content-Type", "text/plain");
    xhr.send(JSON.stringify(post));

    xhr.onload = function () {
        if (xhr.status !== 200) {
            alert("The post could not be created");
        } else {
            document.getElementById('f').style.display = "none";

        }
    };

    xhr.onerror = function () {
        console.log("ERROR");
    };
}

function post_form() {
    return (
        '<form class="form" action="upload" enctype="multipart/form-data">' +
        '<div id="post_form">' +
        '<textarea style="resize:none" id="post_txt" rows="10" cols="50"></textarea>' +
        '</div>' +
        '<label for="img">Select image: </label>' +
        '<input type="file" id="file" name="img" accept="image/*" onchange="preview(event)">' +
        '<div><img id="output" width="70%" /></div>' +
        '<div>' +
        '<input type="button" value="Submit Post" id="btn" style="border: none;" onclick="submit_post();">' +
        '</div>' +
        '</form>'
    );
}


function preview() {
    var image = document.getElementById('output');
    image.src = URL.createObjectURL(event.target.files[0]);
}

function post_input() {
    document.getElementById('f').style.display = "block";
    document.getElementById('f').innerHTML = post_form();
}

function postbutton_form() {
    return (
        '<form class="form">' +
        '<div id="postbutton_form">' +
        '<input type="button" value="Create a Post" id="btn" style="border: none;" onclick="post_input();">' +
        '</div>' +
        '</form>');
}

function post_button() {
    document.getElementById('d').style.display = "block";
    document.getElementById('d').innerHTML = postbutton_form();
}

function show_posts(posts) {
    return (
        '<form>' +
        '<div>' + posts + '</div>' +
        '</form>'
    );
}

function profile(username) {
    if (username === "") {
        username = document.cookie.substring(9);
        user_data.userName = username;
    }
    var xhr = new XMLHttpRequest();
    xhr.open('GET', "/gachimuchi_war_exploded/posts?viewposts=true&user=" + username, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    xhr.onload = function () {
        if (xhr.status !== 200) {
            alert("Could not load profile");
        } else {
            var posts = xhr.response;
            document.getElementById('f').style.display = "block";
            document.getElementById('f').innerHTML = show_posts(posts);
            console.log(posts);
        }
    };

    xhr.onerror = function () {
        console.log("ERROR");
    };
}

function profilebutton_form() {
    return (
        '<form class="form">' +
        '<div id="profilebutton_form">' +
        '<input type="button" value="View Profile" id="btn" style="border: none;" onclick="profile(user_data.userName);">' +
        '</div>' +
        '</form>')
};

function profile_button() {
    document.getElementById('e').style.display = "block";
    document.getElementById('e').innerHTML = profilebutton_form();

}

function get_profile() {
    var username = document.getElementById('search').value;
    profile(username);
}

function search_form() {
    return (
        '<form class="form">' +
        '<div id="search_form">' +
        '<input type="text" class="input" id="search" name="search">' +
        '<input type="button" value="View Profile" id="btn" style="border: none;" onclick="get_profile();">' +
        '</div>' +
        '</form>'
    );
}

function search_user() {
    document.getElementById('f').style.display = "block";
    document.getElementById('f').innerHTML = search_form();
}

function searchbutton_form() {
    return (
        '<form class="form">' +
        '<div id="searchbutton_form">' +
        '<input type="button" value="Search User" id="btn" style="border: none;" onclick="search_user();">' +
        '</div>' +
        '</form>');
}

function search_button() {
    document.getElementById('aftere').style.display = "block";
    document.getElementById('aftere').innerHTML = searchbutton_form();
}

function validate_login() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', "/gachimuchi_war_exploded/login", true);

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    }));

    xhr.onload = function () {
        if (xhr.status !== 200) {
            alert("Your username or password were wrong.");
        } else {
            user_data = JSON.parse(xhr.responseText);
            document.getElementById("in").style.display = "none";
            document.getElementById("up").style.display = "none";
            loggedin = "true";
            logout_button();
            info_button();
            users_button();
            post_button();
            profile_button();
            search_button();
        }
    };

    xhr.onerror = function () {
        console.log("ERROR");
    };
}


//a2
var red = "#DC143C";
var green = "#228B22";
var latitude;
var longtitude;
var isOpen;
var country;
var town;
var address;

function validateForm() {
    var password = document.getElementById("password");
    var passwordConfirm = document.getElementById("passwordconfirm");


    var message = document.getElementById("confirmMessage");

    if (password.value == passwordConfirm.value) {
        message.style.color = green;
        message.innerHTML = "&nbsp;&nbsp;&nbsp;Passwords are the same";
    }
    if (password.value != passwordConfirm.value) {
        message.style.color = red;
        message.innerHTML = "&nbsp;&nbsp;&nbsp;Passwords must be the same";
    }
}

function checkLoc() {

    var loc = document.getElementById('country').value + '+' + document.getElementById('town').value + '+' + document.getElementById('address').value;
    var link = 'https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&polygon=1&q=' + loc;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var answer = JSON.parse(this.responseText);
            console.log(answer);
            if (answer.length > 0) {
                document.getElementById("confirmaddress").style.color = green;
                document.getElementById("confirmaddress").innerHTML = "The address is correct";
                latitude = answer["0"].lat;
                longtitude = answer["0"].lon;
            } else {
                document.getElementById("confirmaddress").style.color = red;
                document.getElementById("confirmaddress").innerHTML = "The address is wrong";
                if (isOpen) {
                    closeMap();
                }
                isOpen = false;
            }
        }
    };
    xhttp.open("GET", link, true);
    xhttp.send();
}

function openMap() {
    document.getElementById("map_placement").innerHTML = "";
    document.getElementById("map_placement").style.height = "500px";
    let map;
    map = new OpenLayers.Map("map_placement");
    map.addLayer(new OpenLayers.Layer.OSM());
    isOpen = true;

    var coordinates = new OpenLayers.LonLat(longtitude, latitude).transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject());
    var zoom = 15;

    var marker = new OpenLayers.Layer.Markers("Markers");
    map.addLayer(marker);

    marker.addMarker(new OpenLayers.Marker(coordinates));

    map.setCenter(coordinates, zoom);
}

function closeMap() {
    map.destroy();
    document.getElementById("map_placement").style.height = "0px";
}

function autoloc() {
    var doc = document.getElementById("autoloc_fail");
    if (!navigator.geolocation) {
        doc.innerHTML = "Geolocation is not supported.";
        if (isOpen) {
            closeMap();
        }
        isOpen = false;
    } else {
        navigator.geolocation.getCurrentPosition(our_position);

        function our_position(position) {
            latitude = position.coords.latitude;
            longtitude = position.coords.longitude;
            openMap();
            write_loc();
        }
    }
}

function write_loc() {
    var link = 'https://nominatim.openstreetmap.org/reverse?format=json&zoom=18&addressdetails=1&lat=' + latitude + '&lon=' + longtitude;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            var answer = JSON.parse(this.responseText);
            console.log(answer);
            if (answer.length != 0) {
                address = answer.address.road;
                document.getElementById('address').value = address;
                town = answer.address.city;
                document.getElementById('town').value = town;
                country = answer.address.country_code.toUpperCase();
                document.getElementById('country').value = country;
            } else {
                document.getElementById("confirmaddress").style.color = red;
                document.getElementById("confirmaddress").innerHTML = "The address is wrong";
                if (isOpen) {
                    closeMap();
                }
                isOpen = false;
            }
        }
    };
    xhttp.open('GET', link, true);
    xhttp.send();
}

//a2