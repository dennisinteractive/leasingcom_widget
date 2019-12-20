(function($) {

  Drupal.wysiwyg.plugins['leasingcom_widget_embed'] = {

    /**
     * Shows the Form.
     */
    show_popup: function (data, settings, instanceId) {
      var wrapperClass = 'wysiwyg-widget-wrapper';

      // Append form.
      jQuery('body').append(settings.form_markup);

      // Display popup centered on screen.
      jQuery('.leasingcom-widget').center().show('fast', 'linear', function () {

        // Listeners for buttons.
        jQuery('#edit-leasingcom-widget-close').click(function () {
          jQuery('.leasingcom-widget').remove();
        });

        if (settings.data !== undefined) {
          jQuery('#edit-leasingcom-widget-insert').val('Update');
          // Fill in the form values with json data.
          var values = settings.data;
          values = JSON.parse(decodeURIComponent(window.atob(values)));
          if (typeof values === 'object') {
            jQuery.each(values, function (name, value) {
              // Escape special characters to ensure jQuery Update compatibility.
              name = name.replace(/(:|\.|\[|\]|,)/g, "\\$1");
              jQuery('.leasingcom-widget [name=' + name + ']').val(value);
            });
          }
          delete settings.data;
        }

        jQuery('#edit-leasingcom-widget-insert').click(function () {
          var data_manufacturer = jQuery('#edit-data-manufacturer').val();
          var data_manufacturerranges = jQuery('#edit-data-manufacturerranges').val();
          var content = '';
          var reg = '';
          var permitted = 'Content required\n';

          if (data_manufacturer.length || data_manufacturerranges.length) {
            if (data_manufacturer === '') {
              jQuery('#edit-data-manufacturer').val(permitted);
              return;
            }
            if (data_manufacturerranges === '') {
              jQuery('#edit-data-manufacturerranges').val(permitted);
              return;
            }

            var values = Drupal.wysiwyg.plugins['leasingcom_widget_embed']._getFormValues(settings);

            /*var placeholder = settings.stock_markup;
            placeholder = placeholder.replace("img", "img data-buyacar-stock-api='" + reg + "'");*/

            //Drupal.wysiwyg.instances[instanceId].insert(placeholder);
            /*var content = '<!--leasingcom_widget_embed_plugin-->';
            Drupal.wysiwyg.instances[instanceId].insert(content);*/
            if (data.format == 'html') {
              var content = '<img src="' + settings.path + '/images/leasingcom_widget_icon.png" width="50px" alt="&lt;--leasingcom_widget_embed_plugin--&gt;" title="&lt;--leasingcom_widget_embed_plugin:data_manufacturer" + values.data_manufacturer + ":data_manufacturer_ranges:" + values.data_manufacturer_ranges + "--&gt;" class="wysiwyg_plugin_see-related drupal-content" />';
            }
            if (typeof content != 'undefined') {
              Drupal.wysiwyg.instances[instanceId].insert(content);
            }

          }

          jQuery('.leasingcom-widget').remove();

        });

      });
    },

    /**
     * Return whether the passed node belongs to this plugin (note that "node" in this context is a JQuery node, not a Drupal node).
     *
     * We identify code managed by this FOO plugin by giving it the HTML class
     * 'wysiwyg_plugin_see-related'.
     */
    isNode: function(node) {
      return ($(node).is('img.wysiwyg_plugin_see-related'));
    },
    /**
     * Invoke is called when the toolbar button is clicked.
     */
    invoke: function(data, settings, instanceId) {
      jQuery('.leasingcom-widget').remove();

      if (data.content !== '') {
        settings.data = jQuery(data.content).data('leasingcom-widget');
      }

      this.show_popup(data, settings, instanceId);


      /*if (data.format == 'html') {
        var content = this._getPlaceholder(settings);
      }
      else {
        var content = '<!--leasingcom_widget_embed_plugin-->';
      }
      if (typeof content != 'undefined') {
        Drupal.wysiwyg.instances[instanceId].insert(content);
      }*/
    },
    /**
     * Replace all <!--leasingcom_widget_embed_plugin--> tags with the icon.
     */
    attach: function(content, settings, instanceId) {
      content = content.replace(/<!--leasingcom_widget_embed_plugin-->/g, this._getPlaceholder(settings));
      return content;
    },
    /**
     * Replace the icons with <!--leasingcom_widget_embed_plugin--> tags in content upon detaching editor.
     */
    detach: function(content, settings, instanceId) {
      var $content = $('<div>' + content + '</div>');
      $.each($('img.wysiwyg_plugin_see-related', $content), function(i, elem) {
        elem.parentNode.insertBefore(document.createComment('leasingcom_widget_embed_plugin'), elem);
        elem.parentNode.removeChild(elem);
      });
      return $content.html();
    },

    /**
     * Helper function to return all values from the form.
     */
    _getFormValues: function(settings) {
      var values = {};

      // Get values from the form. Only get values from input type: text, textarea
      jQuery('.leasingcom-widget *').filter('input[type=text]').each(function(key, value) {

        // Ignore fields that were not normalized when building the form, they will have [] symbols.
        if (this.name.indexOf("[") === -1 && this.name.indexOf("]") === -1) {
          // Only override tags that contain values.
          if (this.value !== "" && typeof this.value != 'undefined' && this.value !== 'undefined') {
            values[this.name] = this.value;
          }
        }
      });

      return values;
    },

    /**
     * Helper function to return a HTML placeholder.
     *
     * Here we provide an image to visually represent the hidden HTML in the Wysiwyg editor.
     */
    _getPlaceholder: function(settings) {
      return '<img src="' + settings.path + '/images/leasingcom_widget_icon.png" width="50px" alt="&lt;--leasingcom_widget_embed_plugin--&gt;" title="&lt;--leasingcom_widget_embed_plugin--&gt;" class="wysiwyg_plugin_see-related drupal-content" />';
    }
  };

})(jQuery);
