//  Agregar nuevo usuario ----------------------------------------------------------------------------
const callUser = () => localStorage.getItem("dataBaseUser") === null ? [] : JSON.parse(localStorage.getItem("dataBaseUser"));
const saveUser = (newUser) => localStorage.setItem("dataBaseUser", JSON.stringify(newUser));


$( document ).ready(function() {

    const APIURL = 'https://jsonplaceholder.typicode.com/posts';

        $("#btnReg").click(() => {

            const datname = document.getElementById ("name").value;
            const datlastname= document.getElementById ("lastname").value;
            const datmail = document.getElementById ("mail").value;
            const datpassword = document.getElementById ("password").value;
        
            const user = { 
                name: datname.toUpperCase(),
                lastname: datlastname.toUpperCase(),
                mail: datmail.toLowerCase(),
                password: datpassword,
            };

            const newUser = callUser();
            newUser.push(user);
            saveUser(newUser);

            $. ajax({
            method : "POST",
            url : APIURL,
            data : user,
            success: function(){ 
                Swal.fire({
                    type: 'success',
                    title: 'Bienvenido!',
                    text: 'Ha sido registrado exitosamente',
                    showConfirmButton: false,
                    timer: 3000
                }).then(function () {
                    window.location = "index.html";
                })
                }
            });  
        }); 

});
