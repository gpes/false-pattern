
package br.edu.ifpb.gpes.shared.readers;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

/**
 *
 * @author natan
 */
public class FileProjectNames {
    
    private File filePath;
    
    public FileProjectNames() {
        this(new File("../selected-projects/projectNames.txt"));
    }
    
    public FileProjectNames(File filePath) {
        this.filePath = filePath;
    }
    
    public List<String> readFile() throws IOException {
        return Files.readAllLines(this.filePath.toPath());
    }
}
