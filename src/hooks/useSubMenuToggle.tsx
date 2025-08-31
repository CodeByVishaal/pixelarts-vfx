const useSubMenuToggle = () => {
    const toggleSubMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        const listItem = e.currentTarget.parentElement;
        // Check if listItem is not null before proceeding
        if (listItem) {

            const subMenu = listItem.querySelector('ul.dropdown-menu, ul.megamenu-content') as HTMLUListElement | null;

            if (subMenu) {
                listItem.classList.toggle('on');
                subMenu.style.maxHeight = subMenu.style.maxHeight === '20000px' ? '0' : '20000px';
            }
        }
    };

    return toggleSubMenu;
};

export default useSubMenuToggle;