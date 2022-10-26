﻿function ajax(e, t, s, n, m, a) {
	var l = new XMLHttpRequest;
	l.open(e, t), l.setRequestHeader("Accept", "application/json"), l.onreadystatechange = function () {
		l.readyState === XMLHttpRequest.DONE && (200 === l.status ? m(n) : a(n))
	}, l.send(s)
}
window.addEventListener("DOMContentLoaded", function () {
		var e = document.getElementsByClassName("menu-icon")[0],
			t = document.getElementsByClassName("navigation")[0],
			s = document.getElementsByClassName("menu")[0];

		function n(e) {
			e.reset();
			var t = e.parentElement.parentElement;
			t.getElementsByClassName("memo")[0].classList.add("success"), t.getElementsByClassName("memo-text")[0].innerHTML = "Thanks!<br /> Your message has been sent.", t.getElementsByClassName("memo-modal")[0].style.opacity = "1", t.getElementsByClassName("memo-modal")[0].style.display = "block", setTimeout(function () {
				t.getElementsByClassName("memo-modal")[0].style.opacity = "0", t.getElementsByClassName("memo-modal")[0].style.display = "none", t.getElementsByClassName("memo")[0].classList.remove("success"), t.getElementsByClassName("memo-text")[0].innerHTML = ""
			}, 4e3)
		}

		function m(e) {
			var t = e.parentElement.parentElement;
			t.getElementsByClassName("memo")[0].classList.add("error"), t.getElementsByClassName("memo-text")[0].innerHTML = "Oops!<br /> There was a problem.", t.getElementsByClassName("memo-modal")[0].style.opacity = "1", t.getElementsByClassName("memo-modal")[0].style.display = "block", setTimeout(function () {
				t.getElementsByClassName("memo-modal")[0].style.opacity = "0", t.getElementsByClassName("memo-modal")[0].style.display = "none", t.getElementsByClassName("memo")[0].classList.remove("error"), t.getElementsByClassName("memo-text")[0].innerHTML = ""
			}, 4e3)
		}
		document.getElementsByClassName("current-year")[0].innerHTML = (new Date).getFullYear(), void 0 !== t && (t.style.height = "0", e.addEventListener("click", function () {
			"0" == t.getBoundingClientRect().height ? (t.style.height = "auto", t.style.padding = "1.5rem 0", e.firstElementChild.firstElementChild.setAttribute("xlink:href", "resources/images/icon-sprite.svg#icon-times-circle")) : (t.style.height = "0", t.style.padding = "0", e.firstElementChild.firstElementChild.setAttribute("xlink:href", "resources/images/icon-sprite.svg#icon-bars"))
		})), void 0 !== s && (s.style.height = "0", e.addEventListener("click", function () {
			"0" == s.getBoundingClientRect().height ? (s.style.height = "auto", s.style.padding = "1.5rem 0", e.firstElementChild.firstElementChild.setAttribute("xlink:href", "resources/images/icon-sprite.svg#icon-times-circle")) : (s.style.height = "0", s.style.padding = "0", e.firstElementChild.firstElementChild.setAttribute("xlink:href", "resources/images/icon-sprite.svg#icon-bars"))
		}));
		for (let e = 0; e < document.forms.length; e++) document.forms[e].getElementsByTagName("button")[0].addEventListener("click", function (t) {
			t.preventDefault();
			var s = new FormData(document.forms[e]);
			document.forms[e] == document.forms[1] && fetch("https://docs.google.com/forms/d/e/1FAIpQLSdNo8tURNDtQ-rbsIdvxIOKXGeZFtQmSXFQ0NNJ8W8QyXGa3w/formResponse?", {
				method: "POST",
				mode: "no-cors",
				cache: "no-cache",
				credentials: "omit",
				headers: {
					"Content-Type": "application/json"
				},
				redirect: "follow",
				body: s
			}).then(e => console.log("Success!", e)).catch(e => console.error("Error!", e.message)), ajax(document.forms[e].method, document.forms[e].action, s, document.forms[e], n, m)
		})
	}),
	function () {
		"use strict";
		for (var e = document.querySelectorAll(".llyv"), t = 0; t < e.length; t++) {
			var s = document.createElement("div");
			s.className = "llyv-play-btn", e[t].appendChild(s);
			var n = document.createElement("img");
			n.src = "https://img.youtube.com/vi/" + e[t].dataset.id + "/hqdefault.jpg", n.alt = "YouTube Thumbnail", e[t].appendChild(n), e[t].addEventListener("click", function () {
				var e = document.createElement("iframe");
				for (e.setAttribute("src", "https://www.youtube.com/embed/" + this.dataset.id + "?rel=0&showinfo=0&autoplay=1"), e.setAttribute("frameborder", "0"), e.setAttribute("allowfullscreen", ""); this.firstChild;) this.removeChild(this.firstChild);
				this.appendChild(e)
			})
		}
	}();