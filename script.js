document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const matricula = document.getElementById('matricula');
    const senha = document.getElementById('senha');
    const matriculaError = document.getElementById('matriculaError');
    const senhaError = document.getElementById('senhaError');
    const submitBtn = document.getElementById('submitBtn');

    matricula.addEventListener('input', (e) => {
        const cleaned = e.target.value.replace(/\D+/g,'');
        if (e.target.value !== cleaned) {
            const pos = e.target.selectionStart - 1;
            e.target.value = cleaned;
            e.target.setSelectionRange(Math.max(0,pos), Math.max(0,pos));
        }
        clearError(matricula, matriculaError);
        toggleSubmit();
    });

    senha.addEventListener('input', () => {
        clearError(senha, senhaError);
        toggleSubmit();
    });

    function showError(input, el, message){
        el.textContent = message;
        el.hidden = false;
        input.classList.add('input-error');
    }

    function clearError(input, el){
        el.textContent = '';
        el.hidden = true;
        input.classList.remove('input-error');
    }

    function validate(){
        let ok = true;
        if (!matricula.value) {
            showError(matricula, matriculaError, 'A matrícula é obrigatória.');
            ok = false;
        } else if (!/^\d{4,}$/.test(matricula.value)) {
            showError(matricula, matriculaError, 'Informe apenas números (mínimo 4 dígitos).');
            ok = false;
        } else {
            clearError(matricula, matriculaError);
        }

        if (!senha.value) {
            showError(senha, senhaError, 'A senha é obrigatória.');
            ok = false;
        } else {
            clearError(senha, senhaError);
        }

        return ok;
    }

    function toggleSubmit(){
        submitBtn.disabled = !(matricula.value && senha.value);
    }
    toggleSubmit();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validate()) {
            submitBtn.textContent = 'Acessando...';
            submitBtn.disabled = true;
            setTimeout(() => {
                submitBtn.textContent = 'Entrar';
                submitBtn.disabled = false;
                alert('Login simulado: credenciais validadas (sem backend).');
            }, 900);
        } else {
            const firstError = document.querySelector('.input-error');
            if (firstError) firstError.focus();
        }
    });

    matricula.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !matricula.value) e.preventDefault(); });
});