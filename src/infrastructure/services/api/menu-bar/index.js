import { Titlebar, Color} from 'custom-electron-titlebar';
import { remote } from 'electron';


export default {
    createMenuBar: () => {
        const customTitlebar = new Titlebar({
            backgroundColor: Color.fromHex('#321854'),
            titleHorizontalAlignment: 'center',
        });

        customTitlebar.updateTitle('*** PROTOTYPE ***');
        
        const menu = new remote.Menu();

        menu.append(new remote.MenuItem({
            label: 'GamePower',
            submenu: [
                {
                    label: 'Options',
                    submenu: [
                        {
                            label: 'Toggle Developer Tools',
                            click: () => { remote.getCurrentWindow().toggleDevTools() },
                            accelerator: 'Ctrl+I'
                        },
                        {
                            role: 'reload'
                        }
                    ]
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Exit',
                    role: 'quit'
                }
            ]
        }));
        
        customTitlebar.updateMenu(menu)
    }
}