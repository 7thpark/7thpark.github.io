(function ($) {
  $('.article-entry p').filter(function () {
    return $(this).find('img').length
  }).addClass('has-img')
  // Search
  const $searchWrap = $('#search-form-wrap')
  let isSearchAnim = false
  const searchAnimDuration = 200

  const startSearchAnim = function () {
    isSearchAnim = true
  }

  const stopSearchAnim = function (callback) {
    setTimeout(function () {
      isSearchAnim = false
      callback && callback()
    }, searchAnimDuration)
  }

  $('#nav-search-btn').on('click', function () {
    if (isSearchAnim) return

    startSearchAnim()
    $searchWrap.addClass('on')
    stopSearchAnim(function () {
      $('.search-form-input').focus()
    })
  })

  $('.search-form-input').on('blur', function () {
    startSearchAnim()
    $searchWrap.removeClass('on')
    stopSearchAnim()
  })

  // Share
  $('body').on('click', function () {
    $('.article-share-box.on').removeClass('on')
  }).on('click', '.article-share-link', function (e) {
    e.stopPropagation()

    const $this = $(this)
    const url = $this.attr('data-url')
    const encodedUrl = encodeURIComponent(url)
    const id = 'article-share-box-' + $this.attr('data-id')
    const offset = $this.offset()

    let box
    if ($('#' + id).length) {
      box = $('#' + id)

      if (box.hasClass('on')) {
        box.removeClass('on')
        return
      }
    } else {
      const html = [
        '<div id="' + id + '" class="article-share-box">',
        '<input class="article-share-input" value="' + url + '">',
        '<div class="article-share-links">',
        '<a href="https://twitter.com/intent/tweet?url=' + encodedUrl + '" class="article-share-twitter" target="_blank" title="Twitter"></a>',
        '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="article-share-facebook" target="_blank" title="Facebook"></a>',
        '<a href="http://pinterest.com/pin/create/button/?url=' + encodedUrl + '" class="article-share-pinterest" target="_blank" title="Pinterest"></a>',
        '<a href="https://plus.google.com/share?url=' + encodedUrl + '" class="article-share-google" target="_blank" title="Google+"></a>',
        '</div>',
        '</div>'
      ].join('')

      box = $(html)

      $('body').append(box)
    }

    $('.article-share-box.on').hide()

    box.css({
      top: offset.top + 25,
      left: offset.left
    }).addClass('on')
  }).on('click', '.article-share-box', function (e) {
    e.stopPropagation()
  }).on('click', '.article-share-box-input', function () {
    $(this).select()
  }).on('click', '.article-share-box-link', function (e) {
    e.preventDefault()
    e.stopPropagation()

    window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450')
  })

  // Caption
  $('.article-entry').each(function (i) {
    $(this).find('img').each(function () {
      if ($(this).parent().hasClass('fancybox')) return

      const alt = this.alt

      if (alt) $(this).after('<span class="caption">' + alt + '</span>')

      $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox"></a>')
    })

    $(this).find('.fancybox').each(function () {
      $(this).attr('rel', 'article' + i)
    })
  })

  if ($.fancybox) {
    $('.fancybox').fancybox()
  }

  // Mobile nav
  const $container = $('#container')
  let isMobileNavAnim = false
  let mobileNavAnimDuration = 200

  const startMobileNavAnim = function () {
    isMobileNavAnim = true
  }

  const stopMobileNavAnim = function () {
    setTimeout(function () {
      isMobileNavAnim = false
    }, mobileNavAnimDuration)
  }

  $('#main-nav-toggle').on('click', function () {
    if (isMobileNavAnim) return

    startMobileNavAnim()
    $container.toggleClass('mobile-nav-on')
    stopMobileNavAnim()
  })

  $('#wrap').on('click', function () {
    if (isMobileNavAnim || !$container.hasClass('mobile-nav-on')) return

    $container.removeClass('mobile-nav-on')
  })
})(window.jQuery)
