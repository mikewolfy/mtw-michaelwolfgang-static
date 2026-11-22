(function () {
  var input = document.getElementById('jwt-input');
  var out = document.getElementById('jwt-output');
  var clearBtn = document.getElementById('jwt-clear');
  var sampleBtn = document.getElementById('jwt-sample');
  var SAMPLE = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  var CLAIMS = { iss: 'Issuer', sub: 'Subject', aud: 'Audience', exp: 'Expiration Time', nbf: 'Not Before', iat: 'Issued At', jti: 'JWT ID' };

  function b64urlToJson(part) {
    var b64 = part.replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4) b64 += '=';
    var bin = atob(b64);
    var bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return JSON.parse(new TextDecoder().decode(bytes));
  }
  function readable(ts) {
    var d = new Date(ts * 1000);
    return isNaN(d.getTime()) ? String(ts) : d.toLocaleString();
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function render() {
    var token = input.value.trim();
    clearBtn.hidden = !token;
    if (!token) {
      out.innerHTML = '<div class="empty-state"><p>Paste a JWT above to decode and view its contents.</p><p class="small">JWTs consist of three parts: Header, Payload, and Signature.</p></div>';
      return;
    }
    try {
      var parts = token.split('.');
      if (parts.length !== 3) throw new Error('Invalid JWT format. A JWT should have 3 parts separated by dots.');
      var header = b64urlToJson(parts[0]);
      var payload = b64urlToJson(parts[1]);
      var shown = {};
      Object.keys(payload).forEach(function (k) { shown[k] = payload[k]; });
      ['exp', 'iat', 'nbf'].forEach(function (k) { if (payload[k]) shown[k + '_readable'] = readable(payload[k]); });

      var html = '<div class="grid cols-2">' +
        '<div class="card"><h2 class="card-title">Header</h2><pre class="out">' + esc(JSON.stringify(header, null, 2)) + '</pre></div>' +
        '<div class="card"><h2 class="card-title">Payload</h2><pre class="out">' + esc(JSON.stringify(shown, null, 2)) + '</pre>';
      var present = Object.keys(CLAIMS).filter(function (k) { return payload[k]; });
      if (present.length) {
        html += '<p class="label" style="margin-top:1rem">Common claims in this token</p><ul class="small">' +
          present.map(function (k) { return '<li><strong>' + k + ':</strong> ' + CLAIMS[k] + '</li>'; }).join('') + '</ul>';
      }
      if (payload.exp) {
        var expired = payload.exp * 1000 < Date.now();
        html += '<div class="notice ' + (expired ? 'error' : 'ok') + '" style="margin-bottom:0"><strong>' + (expired ? 'Expired' : 'Not expired') + '</strong>' + (expired ? 'This token expired on ' : 'This token expires on ') + esc(readable(payload.exp)) + '.</div>';
      }
      html += '</div></div>' +
        '<div class="card" style="margin-top:1.25rem"><h2 class="card-title">Signature</h2><div class="token-parts">' + esc(parts[2]) + '</div>' +
        '<p class="small muted" style="margin:.8rem 0 0"><strong>Note:</strong> The signature can\'t be decoded. It is used to verify that the token hasn\'t been tampered with. This tool does not verify it.</p></div>';
      out.innerHTML = html;
    } catch (err) {
      out.innerHTML = '<div class="notice error" role="alert"><strong>Error</strong>' + esc(err.message && err.message.indexOf('Invalid JWT') === 0 ? err.message : 'Failed to decode JWT. Please make sure it is a valid token.') + '</div>';
    }
  }

  input.addEventListener('input', render);
  clearBtn.addEventListener('click', function () { input.value = ''; render(); input.focus(); });
  sampleBtn.addEventListener('click', function () { input.value = SAMPLE; render(); });
  render();
})();
