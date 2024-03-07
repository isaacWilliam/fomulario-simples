const form = document.getElementById('form')

const nome = document.getElementById('nome')
const email = document.getElementById('email')
const senha = document.getElementById('senha')
const senha2 = document.getElementById('senha2')
const button = document.getElementById('button')
senha2.disabled = true;
button.disabled = true;

form.addEventListener(("submit"), (ev) =>{
    ev.preventDefault();

    checkInputs();
});

function checkInputs(input) {
    const nomeValue = nome.value;
    const emailValue = email.value;
    const senhaValue = senha.value;
    const senha2Value = senha2.value;

    if(input === 'nome'){
        if(nomeValue === '' ){
            setErrorFor(nome, 'O nome de usuário é obrigatório.');
        }else{
            setSuccessFor(nome);
        }
    }

    if(input === 'email'){
        if(emailValue === ''){
            setErrorFor(email, 'O e-mail é obrigatório.');
        }else if(!checkEmail(emailValue)){
            setErrorFor(email, 'O e-mail inválido.');
        }else{
            setSuccessFor(email);
        }
    }

    if(input === 'senha'){
        checkPasswor(senhaValue);
    }

    if(input === 'senha2'){
        if(senhaValue){
            if(senhaValue === senha2Value && senha2Value !== ''){
                setSuccessFor(senha2);
            }else{
                setErrorFor(senha2, 'Senhas não são iguais.')
            }
        }
    }

    const formControls = document.querySelectorAll('.form-control');
    const validForm = [...formControls].every(formControl => {
        return formControl.className === 'form-control success';
    })

    if(validForm){
        console.log('Formulário válido.');
        button.disabled = false;
    }else{
        button.disabled = true;
    }
}

function setErrorFor(input, message){
    const formControl = input.parentElement;
    let small = formControl.querySelector("small");
    formControl.className = 'form-control error';
    small.innerText = message;
}

function setSuccessFor(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function checkEmail(email) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email);
}

function checkPasswor(senha1){
    let reg = [
        /^(?=.*\d)/, /^(?=.*[a-z])/ , /^(?=.*[A-Z])/, /^(?=.*[$*&@#])/ , /^(?:([0-9a-zA-Z$*&@#])(?!\1)){8,}$/i
    ]
    if(!reg[0].test(senha1)) {
        senha2.disabled = true;
        return setErrorFor(senha, 'Deve conter ao menos um número.');
    }else if (!reg[1].test(senha1)) {
        senha2.disabled = true;
        return setErrorFor(senha, 'Deve conter ao menos uma letra minúscula.');
    }else if (!reg[2].test(senha1)) {
        senha2.disabled = true;
        return setErrorFor(senha, 'Deve conter ao menos uma letra maiúscula.');
    }else if (!reg[3].test(senha1)) {
        senha2.disabled = true;
        return setErrorFor(senha, 'Deve conter ao menos um caractere especial.');
    }else if (!reg[4].test(senha1)) {
        senha2.disabled = true;
        return setErrorFor(senha, 'Minímo 8 caracteres mencionados.');
    }else{
        senha2.disabled = false;
        return setSuccessFor(senha);
    }

}

// {/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])(?:([0-9a-zA-Z$*&@#])(?!\1)){8,}$/i}