/* jQuery-only user-interface code for ShopEasy. */
$(document).ready(function () {
  // Keep the footer year current without changing the HTML files.
  $(".current-year").text(new Date().getFullYear());

  // Load catalogue JSON, show a loading message, and report failures.
  const $loading = $("#homeLoading, #catalogueStatus");
  $loading.text("Loading products...");
  $.getJSON("products.json")
    .done(function (data) {
      // Keep the required store.js array in sync with the JSON file.
      products = data;
      if ($("#featuredGrid").length) {
        const featured = products.filter(function (product) { return product.inStock; }).slice(0, 3);
        $("#featuredGrid").empty();
        featured.forEach(function (product) {
          const $card = $('<article class="product-card"></article>');
          const $imageWrap = $('<div class="product-image-wrap"></div>');
          $("<img>").attr({ src: product.image, alt: product.name, loading: "lazy" })
            .on("error", function () { this.onerror = null; this.src = "images/product-placeholder.svg"; })
            .appendTo($imageWrap);
          $('<span class="stock-badge">Featured</span>').appendTo($imageWrap);
          const $content = $('<div class="product-card-content"></div>');
          $("<p>").addClass("product-category").text(product.category).appendTo($content);
          $("<h3>").text(product.name).appendTo($content);
          $("<p>").addClass("product-description").text(product.description).appendTo($content);
          const $bottom = $('<div class="product-card-bottom"></div>');
          $("<strong>").addClass("product-price").text(formatMoney(product.price)).appendTo($bottom);
          $("<span>").addClass("rating").text("★ " + Number(product.rating).toFixed(1)).appendTo($bottom);
          $content.append($bottom);
          const $button = $("<button>").attr({ type: "button", "data-action": "add", "data-id": product.id }).addClass("button button-primary add-button").text("Add to Cart");
          $content.append($button);
          $card.append($imageWrap, $content);
          $("#featuredGrid").append($card);
        });
        $("#featuredGrid .product-card").hide().each(function (index) {
          $(this).delay(index * 100).fadeIn(300);
        });
        $("#homeLoading").text("");
      }
      if ($("#productGrid").length && typeof window.applyShopEasyFilters === "function") {
        window.applyShopEasyFilters();
        $("#catalogueStatus").text(products.length + " products available");
        $("#productGrid .product-card").hide().fadeIn(250);
      }
      renderCart();
    })
    .fail(function () {
      $loading.text("Could not load products.json. Run this project with VS Code Live Server and check the file path.");
      $("#productGrid, #featuredGrid").empty();
    });

  // jQuery FAQ accordion: animate answers open and closed.
  $(".faq-question").on("click", function () {
    const $button = $(this);
    $button.attr("aria-expanded", String($button.attr("aria-expanded") !== "true"));
    $button.next(".faq-answer").stop(true, true).slideToggle(220);
    $button.toggleClass("question-open");
    $button.find("span").text($button.hasClass("question-open") ? "−" : "＋");
  });

  // Show a temporary confirmation with required jQuery method chaining.
  $(document).on("click", "button[data-action='add']", function () {
    if ($(this).prop("disabled")) return;
    $("#toast").text("Added to cart!").addClass("toast-visible").stop(true, true).fadeIn(150).delay(1100).fadeOut(250, function () {
      $(this).removeClass("toast-visible");
    });
  });

  // Animate the toast when cart contents change using a real jQuery event.
  $(window).on("shopeasy:cart-updated", function () {
    $(".cart-count").stop(true, true).addClass("count-pulse").delay(350).queue(function (next) {
      $(this).removeClass("count-pulse");
      next();
    });
  });

  // Start FAQ answers closed.
  $(".faq-answer").hide();
});
