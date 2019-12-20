<?php

/**
 * @file
 * Implement Wysiwyg module hooks.
 */

/**
 * Implements hook_wysiwyg_PLUGIN-NAME_plugin().
 */
function leasingcom_widget_leasingcom_widget_embed_plugin() {
  if (!path_is_admin(current_path())) {
    return;
  }

  $markup = '<div class="leasingcom-widget">
  <form class="leasingcom-widget-form>
    <div class="inner-wrapper">
      <div class="form-textfield-wrapper">
        <label for="edit-data-manufacturer">data-manufacturer</label>
        <p>Example: Audi</p>
        <input type="text" id="edit-data-manufacturer" class="form-text" columns="60" name="data_manufacturer"></input>
      </div>
      <div class="form-textfield-wrapper">
        <label for="edit-leasingcom-widget-url">data-manufacturerRanges</label>
        <p>Example: Audi:TT|Nissan:GT-R|BMW:i8|Mercedes-Benz:SLC|Ford:Mustang|Renault:Twizy</p>
        <input type="text" id="edit-data-manufacturerranges" class="form-text" columns="60" name="data_manufacturer_ranges"></input>
      </div>
      <input id="edit-leasingcom-widget-insert" class="form-submit" type="submit" value="Insert" name="op" onclick="return (false);">
      <input id="edit-leasingcom-widget-close" class="button-no form-submit" type="submit" value="Close" name="op" onclick="return (false);">
      </div>
    </div>
  </form>
  </div>';

  $plugins['leasingcom_widget_embed'] = array(
    'title' => t('Leasing.com widget'),
    'icon title' => t('Place the Leasing.com widget'),
    'icon file' => 'leasingcom_widget_icon.png',
    'settings' => [
      'form_markup' => $markup,
      /*'placeholder_markup' => array(
        'prefix' => '<!--leasingcom-widget-embed',
        'suffix' => '-->',
      ),
      'stock_markup' => '<img class="wysiwyg-buyacar-stock-api-img" title="Stock API" src="'
        . drupal_get_path('module', 'leasingcom_widget')
        . '/plugins/leasingcom_widget_embed/images/leasingcom_widget.png" />',*/
    ],
  );

  return $plugins;
}
