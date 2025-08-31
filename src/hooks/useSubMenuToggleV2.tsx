/* eslint-disable no-unused-vars */
import { useEffect } from "react";

const useSubMenuToggleV2 = (): ((e: React.MouseEvent<HTMLElement>) => void) => {
    useEffect(() => {
        const subMenus = document.querySelectorAll('ul.sub-menu');
        subMenus.forEach(subMenu => {
            (subMenu as HTMLElement).style.display = 'none';
        });
    }, []);

    const toggleSubMenu2 = (e: React.MouseEvent<HTMLElement>): void => {
        e.preventDefault();
        const listItem = (e.target as HTMLElement).parentElement;
        if (!listItem) return;

        const subMenu = listItem.querySelector('ul.sub-menu') as HTMLElement | null;
        if (subMenu) {
            listItem.classList.toggle('on');
            subMenu.style.display = subMenu.style.display === 'none' ? 'block' : 'none';
        }
    };

    return toggleSubMenu2;
};

export default useSubMenuToggleV2;