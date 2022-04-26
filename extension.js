// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// This code based on grayscale-all extension found https://github.com/laerne/desaturate_all
// Repo: https://github.com/amarovita/tint-all

const Clutter = imports.gi.Clutter;
const St = imports.gi.St;
const Main = imports.ui.main;
const Shell = imports.gi.Shell;

let button, extension_icon;
let fx_ndx;
let eid1;

function enable() { 
    button = new St.Bin({
        style_class: 'panel-button',
        reactive: true,
        can_focus: true,
        // x_fill: true,
        // y_fill: false,
        track_hover: true
    });
    extension_icon = new St.Icon({
        icon_name: 'applications-graphics-symbolic',
        style_class: 'system-status-icon'
    });
    button.set_child(extension_icon);

    eid1 = button.connect('button-press-event', _toggleEffect);

    fx_ndx = 0;
    Main.panel._rightBox.insert_child_at_index(button, 0);
    _toggleEffect();
}

function disable() {

    if (fx_ndx) {
        Main.uiGroup.remove_effect(fx);
    }

    if (button) {
        Main.panel._rightBox.remove_child(button);
        if (eid1) {
            button.disconnect(eid1);
            eid1 = null;
        }
        if (extension_icon) {
            button.remove_child(extension_icon);
            delete extension_icon;
            extension_icon = null;
        }
        delete button;
        button = null;
    }
}

function _toggleEffect() {
    if (fx_ndx == 1) {
	print("effect off");
        Main.uiGroup.remove_effect(fx);
	fx_ndx = 0;
    } else {
	print("effect on");
	try {
            shader = Shell.get_file_contents_utf8_sync('.shader.glsl');
	    print("shader loaded");
	} catch (e) {
	    print("shader load error");
            shader = null;
	}
        fx = new Clutter.ShaderEffect(
            { shader_type: Clutter.ShaderType.FRAGMENT_SHADER }
        );
        fx.set_shader_source(shader);
        fx.set_uniform_value('height', Main.uiGroup.get_height());
        fx.set_uniform_value('width', Main.uiGroup.get_width());
	Main.uiGroup.add_effect(fx);
        fx_ndx = 1;
    }
}

function init() {
}
