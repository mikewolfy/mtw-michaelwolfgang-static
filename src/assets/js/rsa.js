(function () {
  var $ = function (id) { return document.getElementById(id); };
  var alg = $('algorithm'), data = $('original-data'), sig = $('signature'), key = $('public-key');
  var result = $('rsa-result'), verifyBtn = $('verify'), clearBtn = $('clear'), exampleBtn = $('example');

  if (!window.crypto || !window.crypto.subtle) {
    result.innerHTML = '<div class="notice error"><strong>Web Crypto is unavailable.</strong>This page must be served over HTTPS (or localhost) for signature verification to work.</div>';
    verifyBtn.disabled = true; exampleBtn.disabled = true;
  }

  function esc(s) { return String(s).replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }); }
  function b64ToBuf(b64) {
    var bin = atob(b64.replace(/\s/g, ''));
    var bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes.buffer;
  }
  function bufToB64(buf) {
    var s = '', b = new Uint8Array(buf);
    for (var i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
    return btoa(s);
  }
  function pem(buf) {
    var b64 = bufToB64(buf).match(/.{1,64}/g).join('\n');
    return '-----BEGIN PUBLIC KEY-----\n' + b64 + '\n-----END PUBLIC KEY-----';
  }
  function error(msg) { result.innerHTML = '<div class="notice error" role="alert"><strong>Error</strong>' + esc(msg) + '</div>'; }

  async function importKey(pemText) {
    var body = pemText.replace('-----BEGIN PUBLIC KEY-----', '').replace('-----END PUBLIC KEY-----', '').replace(/\s/g, '');
    try {
      return await crypto.subtle.importKey('spki', b64ToBuf(body), { name: 'RSASSA-PKCS1-v1_5', hash: alg.value }, true, ['verify']);
    } catch (e) {
      throw new Error('Failed to import public key. Please ensure it is a valid PEM-encoded SPKI public key.');
    }
  }

  verifyBtn.addEventListener('click', async function () {
    result.innerHTML = '';
    verifyBtn.disabled = true; verifyBtn.textContent = 'Verifying…';
    try {
      if (!data.value.trim()) throw new Error('Please enter the original data.');
      if (!sig.value.trim()) throw new Error('Please enter the signature.');
      if (!key.value.trim()) throw new Error('Please enter the public key.');
      var k = await importKey(key.value);
      var sigBuf;
      try { sigBuf = b64ToBuf(sig.value); } catch (e) { throw new Error('Failed to decode signature. Please ensure it is valid base64.'); }
      var ok = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', k, sigBuf, new TextEncoder().encode(data.value));
      result.innerHTML = ok
        ? '<div class="notice ok"><div class="verdict"><div class="icon">✓</div><div><h3>Signature valid</h3><p>The signature was successfully verified with the provided public key.</p></div></div></div>'
        : '<div class="notice error"><div class="verdict"><div class="icon">✗</div><div><h3>Signature invalid</h3><p>The signature could not be verified. It may have been tampered with, the data may differ, or the wrong key or hash was used.</p></div></div></div>';
    } catch (e) {
      error(e.message || 'An error occurred during verification.');
    } finally {
      verifyBtn.disabled = false; verifyBtn.textContent = 'Verify signature';
    }
  });

  clearBtn.addEventListener('click', function () {
    data.value = ''; sig.value = ''; key.value = ''; alg.value = 'SHA-256'; result.innerHTML = '';
  });

  // Generates a real throw-away key pair in the browser and signs a sample message,
  // so the form can be demonstrated end-to-end without any external data.
  exampleBtn.addEventListener('click', async function () {
    exampleBtn.disabled = true;
    try {
      var hash = alg.value;
      var pair = await crypto.subtle.generateKey({ name: 'RSASSA-PKCS1-v1_5', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: hash }, true, ['sign', 'verify']);
      var message = 'Hello, World!';
      var signature = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', pair.privateKey, new TextEncoder().encode(message));
      data.value = message;
      sig.value = bufToB64(signature);
      key.value = pem(await crypto.subtle.exportKey('spki', pair.publicKey));
      result.innerHTML = '<div class="notice ok" style="background:var(--info-soft);color:var(--text);border-color:var(--border-strong)"><strong>Example loaded</strong>A fresh 2048-bit key pair was generated in your browser and used to sign “Hello, World!”. Click “Verify signature” — then change one character of the data to see it fail.</div>';
    } catch (e) {
      error('Could not generate an example: ' + e.message);
    } finally { exampleBtn.disabled = false; }
  });
})();
