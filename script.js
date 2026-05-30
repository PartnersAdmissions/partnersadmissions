function scrollToBooking(){document.getElementById('booking').scrollIntoView({behavior:'smooth'})}
function openBooking(){document.getElementById('booking').scrollIntoView({behavior:'smooth'})}

function openBookingFor(consultantName,subject){
  document.getElementById('modal-sub').textContent='with '+consultantName+' — '+subject;
  document.getElementById('modal-consultant-field').value=consultantName;
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow='hidden';
}

function closeModal(){
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow='';
}

function closeModalOnBg(e){
  if(e.target===document.getElementById('modal-overlay'))closeModal();
}

function handleForm(formId,submitId,msgId){
  const form=document.getElementById(formId);
  const btn=document.getElementById(submitId);
  const msg=document.getElementById(msgId);
  form.addEventListener('submit',async function(e){
    e.preventDefault();
    btn.disabled=true;btn.textContent='Sending...';
    msg.className='form-msg';msg.style.display='none';
    try{
      const res=await fetch('https://api.web3forms.com/submit',{
        method:'POST',
        body:new FormData(form)
      });
      const data=await res.json();
      if(data.success){
        msg.className='form-msg success';
        msg.textContent='✓ Booking request sent! We\'ll confirm within 24 hours.';
        form.reset();
        if(formId==='modal-form')setTimeout(closeModal,2500);
      }else{
        msg.className='form-msg error';
        msg.textContent='Something went wrong. Please try again.';
      }
    }catch(err){
      msg.className='form-msg error';
      msg.textContent='Network error. Please try again.';
    }
    btn.disabled=false;
    btn.textContent=formId==='modal-form'?'Confirm booking →':'Request my session →';
  });
}

handleForm('booking-form','submit-btn','form-msg');
handleForm('modal-form','modal-submit','modal-msg');

const today=new Date().toISOString().split('T')[0];
document.querySelectorAll('input[type=date]').forEach(el=>el.min=today);