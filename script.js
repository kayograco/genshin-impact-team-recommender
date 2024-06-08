document.addEventListener('DOMContentLoaded', () => {
    let selectedEnemies = [];
    let recommendedSlots = {
        dps: [],
        subDPS: [],
        flex: [],
        healerShielder: []
    };
    let recommendedTeams = {
        dps: [],
        subDPS: [],
        flex: [],
        healerShielder: []
    };

    window.resetSelection = resetSelection;
    window.changeCharacter = changeCharacter;
    window.toggleEnemySelection = toggleEnemySelection;
    window.updateEnemySelection = updateEnemySelection;
    window.updateEnemyAttributes = updateEnemyAttributes;
    window.recommendTeams = recommendTeams;
    window.getSortedCharactersByRole = getSortedCharactersByRole;
    window.getWeakElements = getWeakElements;
    window.getStrongElements = getStrongElements;
    window.getEnemyAdvantages = getEnemyAdvantages;
    window.getEnemyDisadvantages = getEnemyDisadvantages;
    window.validateCharacterCompatibility = validateCharacterCompatibility;

    function toggleEnemySelection(enemyName) {
        const enemyIndex = selectedEnemies.indexOf(enemyName);
        if (enemyIndex === -1) {
            selectedEnemies.push(enemyName);
        } else {
            selectedEnemies.splice(enemyIndex, 1);
        }
        updateEnemyAttributes();
        updateEnemySelection();
        recommendTeams();
        generateTeamDescription();
    }

    function updateEnemyAttributes() {
        const tbody = document.getElementById('enemy-attributes-body');
        tbody.innerHTML = '';
        selectedEnemies.forEach(enemy => {
            const tr = document.createElement('tr');
            const enemyData = enemies[enemy];
            const resistances = Object.values(enemyData).slice(0, 8);
            const minResistance = Math.min(...resistances);
            const maxResistance = Math.max(...resistances);

            tr.innerHTML = `
                <td>${enemy}</td>
                ${Object.entries(enemyData).slice(0, 8).map(([key, value]) => 
                    `<td class="resistance ${value === minResistance ? 'lowest' : value === maxResistance ? 'highest' : ''}">${value}%</td>`
                ).join('')}
                <td>${enemyData.advantage.join(', ')}</td>
                <td>${enemyData.disadvantage.join(', ')}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    function updateEnemySelection() {
        const enemyElements = document.querySelectorAll('.enemy');
        enemyElements.forEach(element => {
            if (selectedEnemies.includes(element.textContent)) {
                element.classList.add('selected');
            } else {
                element.classList.remove('selected');
            }
        });
    }

    function recommendTeams() {
        const dpsSlot = document.getElementById('dps-slot');
        const subDPSSlot = document.getElementById('sub-dps-slot');
        const flexSlot = document.getElementById('flex-slot');
        const healerShielderSlot = document.getElementById('healer-shielder-slot');

        if (selectedEnemies.length === 0) {
            resetCharacterDisplay(dpsSlot, 'Name', 'Rol', 'Score');
            resetCharacterDisplay(subDPSSlot, 'Name', 'Rol', 'Score');
            resetCharacterDisplay(flexSlot, 'Name', 'Rol', 'Score');
            resetCharacterDisplay(healerShielderSlot, 'Name', 'Rol', 'Score');
            disableCharacterSlots();
            clearTeamDescription();
            return;
        }

        recommendedSlots.dps = getSortedCharactersByRole('DPS');
        recommendedSlots.subDPS = getSortedCharactersByRole('Sub DPS');
        recommendedSlots.flex = getSortedCharactersByRole('Support', 'Buffer');
        recommendedSlots.healerShielder = getSortedCharactersByRole('Healer', 'Shielder');

        const prefilledTeams = {
            dps: recommendedSlots.dps[0]?.character,
            subDPS: recommendedSlots.subDPS[0]?.character,
            flex: recommendedSlots.flex[0]?.character,
            healerShielder: recommendedSlots.healerShielder[0]?.character,
        };

        recommendedTeams.dps = recommendedSlots.dps.filter(item => validateCharacterCompatibility(item.character, null, prefilledTeams.subDPS, prefilledTeams.flex, prefilledTeams.healerShielder));
        recommendedTeams.subDPS = recommendedSlots.subDPS.filter(item => validateCharacterCompatibility(item.character, recommendedTeams.dps[0]?.character, null, prefilledTeams.flex, prefilledTeams.healerShielder));
        recommendedTeams.flex = recommendedSlots.flex.filter(item => validateCharacterCompatibility(item.character, recommendedTeams.dps[0]?.character, recommendedTeams.subDPS[0]?.character, null, prefilledTeams.healerShielder));
        recommendedTeams.healerShielder = recommendedSlots.healerShielder.filter(item => validateCharacterCompatibility(item.character, recommendedTeams.dps[0]?.character, recommendedTeams.subDPS[0]?.character, recommendedTeams.flex[0]?.character, null));

         // Verificar que los personajes Anemo solo se recomienden si hay personajes Pyro, Electro, Hydro o Cryo en el equipo
         const teamElements = [recommendedTeams.dps[0]?.character, recommendedTeams.subDPS[0]?.character, recommendedTeams.flex[0]?.character, recommendedTeams.healerShielder[0]?.character]
         .map(slot => slot?.element).filter(Boolean);
         const hasSwirlCondition = teamElements.includes('Pyro') || teamElements.includes('Electro') || teamElements.includes('Hydro') || teamElements.includes('Cryo');
         
         if (!hasSwirlCondition) {
            recommendedTeams.dps = recommendedTeams.dps.filter(item => item.character.element !== 'Anemo');
            recommendedTeams.subDPS = recommendedTeams.subDPS.filter(item => item.character.element !== 'Anemo');
            recommendedTeams.flex = recommendedTeams.flex.filter(item => item.character.element !== 'Anemo');
            recommendedTeams.healerShielder = recommendedTeams.healerShielder.filter(item => item.character.element !== 'Anemo');
        }
        
        recommendedTeams.dps = recommendedSlots.dps.filter(item => validateCharacterCompatibility(item.character, null, null, null, null));
        const selectedCharacters = new Set();
        
        const recommendedDPS = recommendedTeams.dps.find(item => !selectedCharacters.has(item.character.name));
        if (recommendedDPS) selectedCharacters.add(recommendedDPS.character.name);
        
        recommendedTeams.subDPS = recommendedSlots.subDPS.filter(item => validateCharacterCompatibility(item.character, recommendedDPS?.character, null, null, null));
        const recommendedSubDPS = recommendedTeams.subDPS.find(item => !selectedCharacters.has(item.character.name));
        if (recommendedSubDPS) selectedCharacters.add(recommendedSubDPS.character.name);
        
        recommendedTeams.flex = recommendedSlots.flex.filter(item => validateCharacterCompatibility(item.character, recommendedDPS?.character, recommendedSubDPS?.character, null, null));
        const recommendedFlex = recommendedTeams.flex.find(item => !selectedCharacters.has(item.character.name));
        if (recommendedFlex) selectedCharacters.add(recommendedFlex.character.name);
        
        recommendedTeams.healerShielder = recommendedSlots.healerShielder.filter(item => validateCharacterCompatibility(item.character, recommendedDPS?.character, recommendedSubDPS?.character, recommendedFlex?.character, null));

        const recommendedHealerShielder = recommendedTeams.healerShielder.find(item => !selectedCharacters.has(item.character.name));
        if (recommendedHealerShielder) selectedCharacters.add(recommendedHealerShielder.character.name);

        updateCharacterDisplay(dpsSlot, recommendedDPS, 'DPS');
        dpsSlot.dataset.index = 0;

        updateCharacterDisplay(subDPSSlot, recommendedSubDPS, 'Sub DPS');
        subDPSSlot.dataset.index = 0;

        updateCharacterDisplay(flexSlot, recommendedFlex, recommendedFlex ? recommendedFlex.character.roles.find(role => !['DPS', 'Sub DPS', 'Healer', 'Shielder'].includes(role)) : 'Flex');
        flexSlot.dataset.index = 0;

        updateCharacterDisplay(healerShielderSlot, recommendedHealerShielder, recommendedHealerShielder && recommendedHealerShielder.character.roles.includes('Healer') ? 'Healer' : 'Shielder');
        healerShielderSlot.dataset.index = 0;

        enableCharacterSlots();
        generateTeamDescription();
    }

    function updateCharacterDisplay(slot, recommendedCharacter, role) {
        if (recommendedCharacter) {
            const { character, score } = recommendedCharacter;
            slot.querySelector('.avatar').src = character.avatar;
            slot.querySelector('.element-icon').src = elementIcons[character.element];
            slot.querySelector('.name').textContent = character.name;
            slot.querySelector('.role').textContent = role;
            slot.querySelector('.score').textContent = score.toFixed(2);
            slot.className = `character ${character.element.toLowerCase()} ${character.weapon.toLowerCase()} star-${character.rarity} ${character.roles.map(role => role.toLowerCase().replace(' ', '-')).join(' ')}`;
        } else {
            resetCharacterDisplay(slot, role);
        }
    }

    function resetCharacterDisplay(slot, name, role = 'Role', score = 'Score') {
        slot.querySelector('.avatar').src = 'https://wiki.hoyolab.com/_nuxt/img/genshin_avatar_bg.d444ebd.png';
        slot.querySelector('.element-icon').src = '';
        slot.querySelector('.name').textContent = name;
        slot.querySelector('.role').textContent = role;
        slot.querySelector('.score').textContent = score;
        slot.className = 'character';
    }

    function changeCharacter(role, supportIndex = null) {
        if (selectedEnemies.length === 0) return;

        if (role === 'DPS') {
            const dpsSlot = document.getElementById('dps-slot');
            let currentIndex = parseInt(dpsSlot.dataset.index || 0);
            currentIndex = (currentIndex + 1) % recommendedTeams.dps.length;
            const newDPS = recommendedTeams.dps[currentIndex].character;
            updateCharacterDisplay(dpsSlot, { character: newDPS, score: recommendedTeams.dps[currentIndex].score }, 'DPS');
            dpsSlot.dataset.index = currentIndex;
        } else if (role === 'Sub DPS') {
            const subDPSSlot = document.getElementById('sub-dps-slot');
            let currentIndex = parseInt(subDPSSlot.dataset.index || 0);
            currentIndex = (currentIndex + 1) % recommendedTeams.subDPS.length;
            const newSubDPS = recommendedTeams.subDPS[currentIndex].character;
            updateCharacterDisplay(subDPSSlot, { character: newSubDPS, score: recommendedTeams.subDPS[currentIndex].score }, 'Sub DPS');
            subDPSSlot.dataset.index = currentIndex;
        } else if (role === 'Flex') {
            const flexSlot = document.getElementById('flex-slot');
            let currentIndex = parseInt(flexSlot.dataset.index || 0);
            currentIndex = (currentIndex + 1) % recommendedTeams.flex.length;
            const newFlex = recommendedTeams.flex[currentIndex].character;
            updateCharacterDisplay(flexSlot, { character: newFlex, score: recommendedTeams.flex[currentIndex].score }, newFlex.roles.find(r => !['DPS', 'Sub DPS', 'Healer', 'Shielder'].includes(r)));
            flexSlot.dataset.index = currentIndex;
        } else if (role === 'Healer/Shielder') {
            const healerShielderSlot = document.getElementById('healer-shielder-slot');
            let currentIndex = parseInt(healerShielderSlot.dataset.index || 0);
            currentIndex = (currentIndex + 1) % recommendedTeams.healerShielder.length;
            const newHealerShielder = recommendedTeams.healerShielder[currentIndex].character;
            updateCharacterDisplay(healerShielderSlot, { character: newHealerShielder, score: recommendedTeams.healerShielder[currentIndex].score }, newHealerShielder.roles.includes('Healer') ? 'Healer' : 'Shielder');
            healerShielderSlot.dataset.index = currentIndex;
        }
    }

    function validateCharacterCompatibility(character, dpsCharacter = null, subDPSCharacter = null, flexCharacter = null, healerShielderCharacter = null) {
        const teamElements = [dpsCharacter, subDPSCharacter, flexCharacter, healerShielderCharacter].map(c => c?.element).filter(Boolean);

        console.log(`Validating character: ${character.name}`);
        console.log(`  DPS: ${dpsCharacter ? dpsCharacter.name : 'None'}`);
        console.log(`  Sub DPS: ${subDPSCharacter ? subDPSCharacter.name : 'None'}`);
        console.log(`  Flex: ${flexCharacter ? flexCharacter.name : 'None'}`);
        console.log(`  Healer/Shielder: ${healerShielderCharacter ? healerShielderCharacter.name : 'None'}`);
        console.log(`  Team elements: ${teamElements.join(',')}`);

        if (character.restrictions.includes('Cryo DPS only') && (!dpsCharacter || dpsCharacter.element !== 'Cryo')) {
            console.log('Failed Cryo DPS only restriction');
            return false;
        }
        if (character.restrictions.includes('Electro DPS only') && (!dpsCharacter || dpsCharacter.element !== 'Electro')) {
            console.log('Failed Electro DPS only restriction');
            return false;
        }
        if (character.restrictions.includes('Geo only') && (!dpsCharacter || dpsCharacter.element !== 'Geo')) {
            console.log('Failed Geo only restriction');
            return false;
        }
        if (character.restrictions.includes('Pyro and Electro')) {
            if (!teamElements.includes('Pyro') || !teamElements.includes('Electro')) {
                console.log('Failed Pyro and Electro restriction');
                return false;
            }
        }
        if (character.restrictions.includes('Includes Hydro') && !teamElements.includes('Hydro')) {
            console.log('Failed Includes Hydro restriction');
            return false;
        }
        if (character.restrictions.includes('Melee DPS') && (!dpsCharacter || !['Sword', 'Claymore', 'Polearm'].includes(dpsCharacter.weapon))) {
            console.log('Failed Melee DPS restriction');
            return false;
        }
        if (character.element === 'Anemo' && character.reactions.includes('swirl')) {
            if (!teamElements.some(element => ['Pyro', 'Electro', 'Hydro', 'Cryo'].includes(element))) {
                console.log('Failed Swirl restriction');
                return false;
            }
        }

        const enemyAdvantages = getEnemyAdvantages();
        const enemyDisadvantages = getEnemyDisadvantages();
        if (character.advantages.some(adv => enemyDisadvantages.includes(adv))) {
            console.log('Advantages matched enemy disadvantages');
            return true;
        }
        if (character.disadvantages.some(disadv => enemyAdvantages.includes(disadv))) {
            console.log('Disadvantages matched enemy advantages');
            return false;
        }

        console.log('   Character is compatible');
        return true;
    }

    function getSortedCharactersByRole(...roles) {
        const include5Star = document.getElementById('include-5-star').checked;
        return characters.filter(character => include5Star || character.rarity === 4).map(character => {
            let score = 0;

            const weakElements = getWeakElements();
            if (weakElements.includes(character.element)) {
                score += 2;
            }

            const strongElements = getStrongElements();
            if (strongElements.includes(character.element)) {
                score -= 2;
            }

            const enemyAdvantages = getEnemyAdvantages();
            const enemyDisadvantages = getEnemyDisadvantages();
            if (character.advantages.some(adv => enemyDisadvantages.includes(adv))) {
                score += 1;
            }
            if (character.disadvantages.some(disadv => enemyAdvantages.includes(disadv))) {
                score -= 1;
            }

            if (character.rarity === 5) {
                score += 0.01;
            }

            const releaseDate = new Date(character.releaseDate);
            const initialReleaseDate = new Date('2020-09-28');
            const monthsSinceInitialRelease = (releaseDate.getFullYear() - initialReleaseDate.getFullYear()) * 12 +
                                              (releaseDate.getMonth() - initialReleaseDate.getMonth());
            score += monthsSinceInitialRelease * 0.01;

            return { character, score };
        }).filter(item => roles.some(role => item.character.roles.includes(role)))
          .sort((a, b) => b.score - a.score);
    }

    function getWeakElements() {
        const weakElements = [];
        selectedEnemies.forEach(enemy => {
            const enemyData = enemies[enemy];
            const resistances = Object.entries(enemyData).slice(0, 8);
            const minResistance = Math.min(...resistances.map(([element, value]) => value));
            resistances.forEach(([element, value]) => {
                if (value === minResistance) {
                    weakElements.push(element);
                }
            });
        });
        return weakElements;
    }

    function getStrongElements() {
        const strongElements = [];
        selectedEnemies.forEach(enemy => {
            const enemyData = enemies[enemy];
            const resistances = Object.entries(enemyData).slice(0, 8);
            const maxResistance = Math.max(...resistances.map(([element, value]) => value));
            resistances.forEach(([element, value]) => {
                if (value === maxResistance) {
                    strongElements.push(element);
                }
            });
        });
        return strongElements;
    }

    function getEnemyAdvantages() {
        const advantages = [];
        selectedEnemies.forEach(enemy => {
            const enemyData = enemies[enemy];
            advantages.push(...enemyData.advantage);
        });
        return advantages;
    }

    function getEnemyDisadvantages() {
        const disadvantages = [];
        selectedEnemies.forEach(enemy => {
            const enemyData = enemies[enemy];
            disadvantages.push(...enemyData.disadvantage);
        });
        return disadvantages;
    }

    function resetSelection() {
        selectedEnemies = [];
        updateEnemySelection();
        updateEnemyAttributes();
        recommendTeams();
        clearTeamDescription();
    }

    function disableCharacterSlots() {
        const characterSlots = document.querySelectorAll('#recommended-team .character');
        characterSlots.forEach(slot => {
            slot.onclick = null;
        });
    }

    function enableCharacterSlots() {
        const characterSlots = document.querySelectorAll('#recommended-team .character');
        characterSlots.forEach(slot => {
            if (slot.id === 'dps-slot') {
                slot.onclick = () => changeCharacter('DPS');
            } else if (slot.id === 'sub-dps-slot') {
                slot.onclick = () => changeCharacter('Sub DPS');
            } else if (slot.id === 'flex-slot') {
                slot.onclick = () => changeCharacter('Flex');
            } else if (slot.id === 'healer-shielder-slot') {
                slot.onclick = () => changeCharacter('Healer/Shielder');
            }
        });
    }

    function generateEnemyButtons() {
        const enemyContainer = document.querySelector('.enemy-container');
        for (const enemyName in enemies) {
            const enemyButton = document.createElement('div');
            enemyButton.className = 'enemy';
            enemyButton.innerHTML = `<span>${enemyName}</span>`;
            enemyButton.setAttribute('data-img-url', enemies[enemyName].imgUrl);
            enemyButton.onclick = () => toggleEnemySelection(enemyName);
            enemyContainer.appendChild(enemyButton);
        }

        const style = document.createElement('style');
        let styles = '';
        for (const enemyName in enemies) {
            const imgUrl = enemies[enemyName].imgUrl;
            styles += `
                .enemy[data-img-url="${imgUrl}"]::before {
                    content: '';
                    background-image: url('${imgUrl}');
                }
            `;
        }
        style.innerHTML = styles;
        document.head.appendChild(style);
    }

    function generateTeamDescription() {
        const descriptionElement = document.getElementById('team-description');

        // Verificar si no hay enemigos seleccionados
        if (selectedEnemies.length === 0) {
            descriptionElement.innerHTML = '';
            return;
        }
        
        descriptionElement.innerHTML = '';
    
        const teamCharacters = [
            getDisplayedCharacter('dps-slot'),
            getDisplayedCharacter('sub-dps-slot'),
            getDisplayedCharacter('flex-slot'),
            getDisplayedCharacter('healer-shielder-slot')
        ].filter(Boolean);
    
        const teamElements = teamCharacters.map(character => character.element);
        const reactionCounts = {};
    
        teamCharacters.forEach(character => {
            character.reactions.forEach(reaction => {
                const requiredElements = reactionsElements[reaction];
                if (reaction === 'swirl') {
                    if (teamElements.includes('Anemo') && ['Pyro', 'Electro', 'Hydro', 'Cryo'].some(e => teamElements.includes(e))) {
                        if (!reactionCounts[reaction]) {
                            reactionCounts[reaction] = new Set();
                        }
                        reactionCounts[reaction].add(character.name);
                    }
                } else if (reaction === 'crystallize') {
                    if (teamElements.includes('Geo') && ['Pyro', 'Electro', 'Hydro', 'Cryo'].some(e => teamElements.includes(e))) {
                        if (!reactionCounts[reaction]) {
                            reactionCounts[reaction] = new Set();
                        }
                        reactionCounts[reaction].add(character.name);
                    }
                } else if (reaction === 'burgeon') {
                    if (teamElements.includes('Dendro') && teamElements.includes('Hydro') && teamElements.includes('Pyro')) {
                        if (!reactionCounts[reaction]) {
                            reactionCounts[reaction] = new Set();
                        }
                        reactionCounts[reaction].add(character.name);
                    }
                } else if (reaction === 'bloom') {
                    if (teamElements.includes('Dendro') && teamElements.includes('Hydro')) {
                        if (!reactionCounts[reaction]) {
                            reactionCounts[reaction] = new Set();
                        }
                        reactionCounts[reaction].add(character.name);
                    }
                } else if (reaction === 'hyperbloom') {
                    if (teamElements.includes('Dendro') && teamElements.includes('Hydro') && teamElements.includes('Electro')) {
                        if (!reactionCounts[reaction]) {
                            reactionCounts[reaction] = new Set();
                        }
                        reactionCounts[reaction].add(character.name);
                    }
                } else if (requiredElements.every(element => teamElements.includes(element))) {
                    if (!reactionCounts[reaction]) {
                        reactionCounts[reaction] = new Set();
                    }
                    reactionCounts[reaction].add(character.name);
                }
            });
        });
    
        if (Object.keys(reactionCounts).length === 0) {
            descriptionElement.textContent = 'No valid reactions found.';
            return;
        }
    
        for (const [reaction, characters] of Object.entries(reactionCounts)) {
            const characterList = Array.from(characters).join(' y ');
            const reactionText = `${reaction.charAt(0).toUpperCase() + reaction.slice(1)} con ${characterList}`;
            const p = document.createElement('p');
            p.textContent = reactionText;
            descriptionElement.appendChild(p);
        }
    }

    function clearTeamDescription() {
        const descriptionElement = document.getElementById('team-description');
        descriptionElement.innerHTML = '';
    }

    function getDisplayedCharacter(slotId) {
        const slot = document.getElementById(slotId);
        const characterName = slot.querySelector('.name').textContent;
        return characters.find(character => character.name === characterName);
    }

    function init() {
        generateEnemyButtons();
        resetSelection();
        document.getElementById('include-5-star').addEventListener('change', recommendTeams);
    }

    init();
});
