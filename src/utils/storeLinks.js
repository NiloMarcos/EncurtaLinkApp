import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getLinksSave(key){
  const myLinks = await AsyncStorage.getItem(key);
  let linksSaves = JSON.parse(myLinks) || [];
  return linksSaves;
}

export async function saveLink(key, newLink){
  let linksStored = await getLinksSave(key);
  const hasLink = linksStored.some(link => link.id === newLink.id);

  if(hasLink){
    alert("Esse link ja existe na lista");
    return;
  }

  linksStored.push(newLink);
  await AsyncStorage.setItem(key, JSON.stringify(linksStored));
  console.log('Link Salvo Com Sucesso');
}

export async function deleteLink(links, id){
  let myLinks = links.filter((item) => {
    return (item.id !== id);
  })
  await AsyncStorage.setItem('links', JSON.stringify(myLinks));
  console.log('Link Deletado do storage')
  return myLinks;
}