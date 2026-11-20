(function(){
  var EMAIL='info@sgbuildersllc.com', TEL='+17166766333', TELD='(716) 676-6333';
  // Mobile menu
  var btn=document.querySelector('header button[aria-label]');
  if(btn){
    var header=btn.closest('header');
    var panel=document.createElement('div');
    panel.className='border-t border-line bg-paper px-5 py-4 md:hidden';
    panel.hidden=true;
    var links=[['work.html','Buildings'],['services.html','Services'],['about.html','About'],['contact.html','Contact']];
    var nav='<nav class="flex flex-col">'+links.map(function(l){return '<a class="border-b border-line py-3 text-base text-ink" href="'+l[0]+'">'+l[1]+'</a>';}).join('')+'<a href="tel:'+TEL+'" class="py-3 text-base text-nucor">'+TELD+'</a></nav>';
    panel.innerHTML=nav; header.appendChild(panel);
    var openIcon=btn.innerHTML;
    var closeIcon='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-5" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>';
    btn.addEventListener('click',function(){
      var open=panel.hidden; panel.hidden=!open;
      btn.setAttribute('aria-expanded',open?'true':'false');
      btn.setAttribute('aria-label',open?'Close menu':'Open menu');
      btn.innerHTML=open?closeIcon:openIcon;
    });
  }
  // Contact brief
  var form=document.getElementById('brief');
  if(form){
    var msg=document.getElementById('brief-msg'), note=document.getElementById('brief-note');
    function v(n){var el=form.elements[n];return el?el.value.trim():'';}
    function brief(){return ['Name: '+v('name'),'Company: '+(v('companyName')||'n/a'),'Email: '+v('email'),'Phone: '+v('phone'),'Project city: '+v('city'),'Building type: '+v('type'),'Approximate size: '+(v('size')||'n/a'),'Timeline: '+(v('timeline')||'n/a'),'',v('notes')||'No extra notes.'].join('\n');}
    function say(t){msg.textContent=t;msg.hidden=!t;}
    form.addEventListener('submit',function(e){
      e.preventDefault();
      if(!v('name')||!v('email')||!v('phone')||!v('city')){say('Name, email, phone, and project city are required.');return;}
      say('');
      var subj='Quote request: '+v('type')+' in '+v('city');
      window.location.href='mailto:'+EMAIL+'?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(brief());
      note.innerHTML='Your email app should open with this brief addressed to '+EMAIL+'. If it does not, call <a class="text-ink underline" href="tel:'+TEL+'">'+TELD+'</a>.';
    });
    document.getElementById('copy-brief').addEventListener('click',function(){
      if(navigator.clipboard){navigator.clipboard.writeText(brief()).then(function(){say('Brief copied.');},function(){say('Could not copy. Select the summary below instead.');});}
      else say('Could not copy. Select the summary below instead.');
    });
  }
})();
