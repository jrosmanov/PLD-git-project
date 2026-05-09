function el(q){return document.querySelector(q)}
function elAll(q){return document.querySelectorAll(q)}

document.addEventListener('DOMContentLoaded', ()=>{
  const year = new Date().getFullYear();
  el('#year').textContent = year;

  fetch('data.json')
    .then(r=>r.json())
    .then(render)
    .catch(err=>{
      console.error('data.json yüklənmədi', err)
    })

  // nav toggle for small screens
  el('.nav-toggle').addEventListener('click', ()=>{
    const links = el('.nav-links');
    links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
  })

  // add scrolled class on header when page scrolls
  const navWrap = document.querySelector('.nav-wrap');
  window.addEventListener('scroll', ()=>{
    if(window.scrollY > 20) navWrap.classList.add('scrolled'); else navWrap.classList.remove('scrolled');
  });

  // smooth scroll
  elAll('.nav-links a').forEach(a=>{
    a.addEventListener('click', e=>{
      e.preventDefault();
      const id = a.getAttribute('href');
      document.querySelector(id).scrollIntoView({behavior:'smooth'});
    })
  })

  // contact form
  const form = el('#contact-form');
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const name = el('#name').value.trim();
    const email = el('#email').value.trim();
    const message = el('#message').value.trim();
    const mailto = `mailto:${window.__data.contact.email}?subject=${encodeURIComponent('Kontakt formu — '+name)}&body=${encodeURIComponent(message + '\n\n' + email)}`;
    window.location.href = mailto;
  })
})

function render(data){
  window.__data = data;
  el('#team-name').textContent = data.team.name;
  el('#team-tagline').textContent = data.team.tagline;
  el('#team-desc').textContent = data.team.description;

  const membersWrap = el('#members');
  membersWrap.innerHTML = '';
  data.members.forEach((m, idx)=>{
    const card = document.createElement('div');
    card.className = 'card';

    const photoWrap = document.createElement('div');
    photoWrap.className = 'member-photo-wrap';

    // if photo provided, use it; otherwise initials with colorful background
    if(m.photo){
      const img = document.createElement('img');
      img.src = m.photo;
      img.alt = m.name;
      photoWrap.appendChild(img);
    } else {
      const avatar = document.createElement('div');
      avatar.className = 'member-avatar';
      avatar.textContent = initials(m.name);
      avatar.style.background = randomGradient(m.name);
      avatar.style.fontSize = '18px';
      photoWrap.appendChild(avatar);
    }

    const meta = document.createElement('div');
    meta.className = 'member-content';
    const nameEl = document.createElement('div'); nameEl.className='member-name'; nameEl.textContent = m.name;
    const roleEl = document.createElement('div'); roleEl.className='member-role'; roleEl.textContent = m.role;
    const bioEl = document.createElement('div'); bioEl.className='meta'; bioEl.textContent = m.bio;
    meta.appendChild(nameEl); meta.appendChild(roleEl); meta.appendChild(bioEl);
    // linkedin link
    if(m.linkedin){
      const ln = document.createElement('a');
      ln.href = m.linkedin;
      ln.target = '_blank';
      ln.rel = 'noopener';
      ln.className = 'member-badge';
      ln.textContent = 'LinkedIn ↗';
      meta.appendChild(ln);
    }
    card.appendChild(photoWrap);
    card.appendChild(meta);
    // staggered animation
    card.style.animationDelay = `${idx * 80}ms`;
    membersWrap.appendChild(card);
  })

  const projectsWrap = el('#projects-list');
  projectsWrap.innerHTML = '';
  data.projects.forEach((p, idx)=>{
    const card = document.createElement('div'); card.className='card';
    if(p.image){
      const img = document.createElement('img'); img.src = p.image; img.alt = p.title; img.className = 'project-image'; card.appendChild(img);
    }
    const title = document.createElement('h3'); title.textContent = p.title;
    const desc = document.createElement('p'); desc.textContent = p.desc;
    const link = document.createElement('a'); link.href = p.link; link.textContent = 'View'; link.className='btn'; link.style.marginTop='10px';
    card.appendChild(title); card.appendChild(desc); card.appendChild(link);
    card.style.animationDelay = `${idx * 80}ms`;
    projectsWrap.appendChild(card);
  })

  // contact info
  const contactInfo = el('#contact-info');
  contactInfo.innerHTML = `<strong>Email:</strong> ${data.contact.email}<br><strong>Phone:</strong> ${data.contact.phone}<br><strong>Address:</strong> ${data.contact.address}`;
  // footer contact
  const footerContact = el('#footer-contact');
  if(footerContact) footerContact.innerHTML = `<strong>Email:</strong> ${data.contact.email}<br><strong>Phone:</strong> ${data.contact.phone}`;
}

function initials(name){
  return name.split(' ').map(n=>n.charAt(0)).slice(0,2).join('').toUpperCase();
}

function randomGradient(seed){
  const colors = ['#ff6b6b','#f7b731','#5f27cd','#54a0ff','#01a3a4','#00d2d3'];
  let h = 0; for(let i=0;i<seed.length;i++) h = (h<<5)-h + seed.charCodeAt(i);
  const c1 = colors[Math.abs(h) % colors.length];
  const c2 = colors[(Math.abs(h)+2) % colors.length];
  return `linear-gradient(135deg, ${c1}, ${c2})`;
}
